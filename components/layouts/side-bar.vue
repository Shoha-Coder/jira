<template>
  <div
    class="fixed top-0 left-0 bottom-0 h-screen bg-gray-300 dark:bg-gray-900 w-72 border-r dark:border-r-gray-700 border-r-gray-200 pt-4"
  >
    <div class="flex flex-col space-y-6">
      <NuxtLink to="/" class="flex items-center space-x-1 justify-center">
        <NuxtImg src="https://links.shoha-coder.uz/jira/logo.svg" width="50" height="50" />
        <span class="text-2xl font-medium">Jira Software</span>
      </NuxtLink>
      <div>
        <SharedSideBarItem />
      </div>
    </div>
  </div>
</template>
