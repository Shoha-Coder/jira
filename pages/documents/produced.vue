<script lang="ts" setup>
import { useDeals } from "~/query/use-deals";
import { useDelete } from "~/query/use-delete";
import { useEditDealStore } from "~/store/use-edit-deal.store";
import { EnumStatus } from "~/types";

const { set } = useCurrentDealStore();
const editDeal = useEditDealStore();
definePageMeta({ layout: "documents" });
useHead({ title: "Produced | Jira Software" });
const { data, isLoading, refetch } = useDeals(EnumStatus.produced);
const { isDeleting, deleteDeal } = useDelete(refetch);
const handleDelete = (id: string) => {
  const confirm = window.confirm("Are you sure you wanna delete this deal?");
  if (confirm) deleteDeal(id);
};
</script>
<template>
  <div class="flex items-center justify-between">
    <h1 class="text-4xl font-bold">Produced</h1>
    <SharedCreateDeal :status="EnumStatus.produced" :refetch="refetch" />
  </div>
  <UDivider class="my-2" />
  <div class="grid grid-cols-4 gap-2" v-if="isLoading">
    <div
      class="my-3"
      v-for="(item, index) in Array.from({ length: 4 })"
      :key="index"
    >
      <div class="my-3 dark:bg-gray-900 bg-gray-300 rounded-md p-3 animation">
        <USkeleton class="w-10/12 h-4" />
        <USkeleton class="w-full h-1 my-3" />
        <USkeleton class="w-full h-8" />
        <USkeleton class="w-full h-6 mt-3" />
      </div>
    </div>
  </div>
  <div v-else>
    <div v-if="data?.length">
      <div class="grid grid-cols-4 gap-2">
        <div
          class="my-3 dark:bg-gray-900 bg-gray-100 rounded-md p-2 animation"
          v-for="item in data"
          :key="item.$id"
          role="button"
          draggable="true"
        >
          <div
            class="flex items-center space-x-2"
            @click="set(item)"
            role="button"
          >
            <span class="uppercase font-bold text-lg">{{ item.name }}</span>
          </div>
          <UDivider class="my-3" />
          <div
            class="opacity-55 text-sm line-clamp-1"
            @click="set(item)"
            role="button"
          >
            {{ item.description }}
          </div>
          <div class="grid grid-cols-2 gap-2 mt-2">
            <UButton block color="blue" @click="editDeal.set(item)"
              >Edit</UButton
            >
            <UButton
              block
              color="red"
              @click="() => handleDelete(item.$id)"
              :disabled="isDeleting"
              >Delete</UButton
            >
          </div>
        </div>
        <Slideover />
        <SharedEditDeal :refetch="refetch" />
      </div>
    </div>
    <div v-else>
      <div class="flex flex-col items-center justify-center">
        <NuxtImg src="https://links.shoha-coder.uz/jira/no-data.svg" width="300" height="300" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes show {
  from {
    transform: scale(0.5) translateY(-30px);
    opacity: 0.4;
  }
  to {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}
.animation {
  animation: show 0.3s ease-in-out;
}
</style>
