<script lang="ts" setup>
const { currentUser } = useAuthStore();
</script>

<template>
  <UPopover :popper="{ placement: 'left' }">
    <UAvatar :alt="currentUser.name" class="uppercase" size="lg" />

    <template #panel>
      <div class="p-4 w-72 bg-white dark:bg-black">
        <p class="text-neutral-600 text-sm">{{ currentUser.email }}</p>
        <div class="flex items-center mt-3 space-x-2">
          <div class="rounded-md dark:bg-gray-900 bg-gray-300 p-1">
            <UAvatar :alt="currentUser.name" class="uppercase" />
          </div>
          <p class="capitalize text-[15px]">
            {{ currentUser.name }}'s documents
          </p>
        </div>
        <UDivider class="my-3" />
        <NuxtLink to="/profile">
          <UButton class="w-full" color="blue" variant="ghost">Profile</UButton>
        </NuxtLink>
        <NuxtLink to="/logout">
          <UButton class="w-full" color="red" variant="ghost">Logout</UButton>
        </NuxtLink>
      </div>
    </template>
  </UPopover>
</template>
