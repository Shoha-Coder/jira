<script lang="ts" setup>
import { useCurrentDealStore } from "~/store/current-deal.store";
import dayjs from "dayjs";
const store = useCurrentDealStore();
const isExpended = ref(false);
const description = store.deal?.description as string;
isExpended.value = description.length > 200 ? true : false;
const toggleExpended = () => {
  isExpended.value = !isExpended.value;
};
</script>
<template>
  <div class="rounded p-3 dark:bg-gray-800 bg-gray-200">
    <div class="uppercase text-xl mb-4 font-medium">About deal</div>
    <SlideoverLabel label-text="Name">{{ store.deal?.name }}</SlideoverLabel>
    <SlideoverLabel label-text="Status">
      <UBadge color="blue" class="font-bold">{{ store.deal?.status }}</UBadge>
    </SlideoverLabel>
    <SlideoverLabel label-text="Created at">{{
      dayjs(store.deal?.$createdAt).format("DD.MM.YYYY")
    }}</SlideoverLabel>
    <SlideoverLabel label-text="Description">
      <template v-if="isExpended">
        <div class="relative group">
          <div
            class="absolute bg-gradient-to-b from-transparent dark:to-gray-800 to-gray-200 inset-0"
          ></div>
          <p class="">{{ store.deal?.description.slice(0, 200) }}...</p>
          <div
            role="button"
            class="relative flex justify-center group-hover:opacity-100 transition opacity-0"
            @click="toggleExpended"
          >
            <Icon name="ic:baseline-arrow-downward" />
          </div>
        </div>
      </template>
      <template v-if="!isExpended">
        <div class="group">
          <p class="">{{ store.deal?.description }}</p>
          <div
            role="button"
            class="relative flex justify-center opacity-0 group-hover:opacity-100 transition"
            @click="toggleExpended"
          >
            <Icon name="ic:baseline-arrow-upward" />
          </div>
        </div>
      </template>
    </SlideoverLabel>
  </div>
</template>
