<script lang="ts" setup>
import { ACCOUNT } from "~/libs/appwrite";
const loadingStore = useLoadingStore();
const authStore = useAuthStore();
const router = useRouter();

onMounted(() => {
  ACCOUNT.get()
    .then((response) => {
      loadingStore.set(false);
      authStore.set({
        email: response.email,
        id: response.$id,
        name: response.name,
        status: response.status,
      });
    })
    .finally(() => loadingStore.set(false));
});
</script>
<template>
  <UiLoader v-if="loadingStore.isLoading" />
  <main v-else>
    <LayoutsNavbar />
    <LayoutsSideBar />
    <section class="min-h-screen bg-white dark:bg-black pl-72 pt-[10vh]">
      <div class="p-4">
        <slot />
      </div>
    </section>
  </main>
</template>
