<script lang="ts" setup>
import dayjs from "dayjs";
import { useCommentsQuery } from "~/query/use-comments";
import type { IComment, IDeal } from "~/types";
import type { FormError, FormSubmitEvent } from "#ui/types";
import { useMutation } from "@tanstack/vue-query";
import { DATABASE, UNIQUE_ID } from "~/libs/appwrite";
import { COLLECTION_COMMENTS, DB_ID } from "~/constants";
const { data, refetch, isLoading } = useCommentsQuery();

const { deal } = useCurrentDealStore();
const toast = useToast();

const { mutate, isPending } = useMutation({
  mutationKey: ["create-comment"],
  mutationFn: ({ text }: { text: string }) =>
    DATABASE.createDocument(DB_ID, COLLECTION_COMMENTS, UNIQUE_ID, {
      text: text,
      deal: deal?.$id,
    }),
  onSuccess: () => {
    refetch();
    state.text = undefined;
    toast.add({
      title: "Comment added",
      description: "Your comment has been added successfully!",
      color: "blue",
    });
  },
  onError: (error) => {
    toast.add({
      title: "Error",
      description: error.message,
      color: "red",
    });
  },
});

const state = reactive({
  text: undefined,
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.text) errors.push({ path: "text", message: "Text is required!" });
  return errors;
};

async function onSubmit(event: FormSubmitEvent<any>) {
  mutate({ text: event.data.text });
}
</script>

<template>
  <UForm
    :validate="validate"
    :state="state"
    @submit="onSubmit"
    class="relative h-12"
  >
    <UFormGroup name="text">
      <UInput
        size="lg"
        placeholder="Create a comment..."
        color="blue"
        v-model="state.text"
        :disabled="isPending"
      />
    </UFormGroup>
    <div class="absolute top-0 right-0 bottom-0">
      <UButton color="blue" size="lg" type="submit" :disabled="isPending">
        <template v-if="isPending">
          <Icon name="svg-spinners:180-ring" />
        </template>
        <template v-else>
          <Icon name="material-symbols:add" size="20" />
        </template>
      </UButton>
    </div>
  </UForm>
  <div v-if="isLoading" class="flex items-center space-x-4 mt-8">
    <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
    <div class="space-y-2">
      <USkeleton class="h-4 w-[250px]" />
      <USkeleton class="h-4 w-[200px]" />
    </div>
  </div>
  <div v-else-if="data">
    <div class="flex items-start mt-8" v-for="item in data" :key="item.$id">
      <Icon name="radix-icons:chat-bubble" class="mr-3 mt-1" size="20" />
      <div
        class="border-border rounded-md w-full dark:bg-gray-800 bg-gray-200 relative px-3 min-h-12"
      >
        <div class="absolute right-2 bottom-1 text-blue-500 text-sm font-bold">
          {{ dayjs(item.$createdAt).format("HH:mm") }}
        </div>
        <p class="pt-3 pb-5">{{ item.text }}</p>
      </div>
    </div>
  </div>
</template>
