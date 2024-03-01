<script lang="ts" setup>
import { ACCOUNT } from "~/libs/appwrite";
import { useLoadingStore } from "~/store/loading.store";

definePageMeta({ layout: "auth" });
useHead({ title: "Auth | Jira software" });
const loadingStore = useLoadingStore();
const router = useRouter();
onMounted(() => {
  ACCOUNT.get()
    .then(() => router.push("/"))
    .catch(() => loadingStore.set(false));
});

const isLogin = ref(true);
const toggleLogin = () => (isLogin.value = !isLogin.value);
const authGoogle = () =>
  ACCOUNT.createOAuth2Session("google", "https://jira.shoha-coder.uz");
const authGithub = () =>
  ACCOUNT.createOAuth2Session("github", "https://jira.shoha-coder.uz");
</script>
<template>
  <UiLoader v-if="loadingStore.isLoading" />
  <div class="flex items-center justify-center h-screen w-full relative" v-else>
    <NuxtImg
      src="/bg-auth.jpg"
      class="absolute inset-0 w-full h-full object-cover z-10"
    />
    <div
      class="absolute inset-0 w-full h-full z-20 dark:bg-black/40 bg-white/40"
    ></div>
    <UCard class="z-50 w-1/2 relative" :ui="{ body: { base: 'flex gap-4' } }">
      <div class="space-y-4 flex-1">
        <h1 class="text-2xl font-bold">
          <template v-if="isLogin">Login</template>
          <template v-else>Register</template>
        </h1>
        <p class="opacity-70">
          <template v-if="isLogin"
            >Please use the following credentials to login
          </template>
          <template v-else
            >Please use the following credentials to register
          </template>
        </p>
        <AuthLogin v-if="isLogin" :toggle-login="toggleLogin" />
        <AuthRegister v-else :toggle-login="toggleLogin" />
      </div>
      <UDivider label="OR" orientation="vertical" class="w-fit" />
      <div class="flex space-y-4 flex-1 flex-col justify-center items-center">
        <UButton color="black" block size="md" @click="authGithub">
          <Icon name="mdi:github" class="w-5 h-5" />
          <template v-if="isLogin"> Login with GitHub </template>
          <template v-else> Login with Google </template>
        </UButton>
        <UButton color="black" block size="md" @click="authGoogle">
          <Icon name="ri:google-fill" class="w-5 h-5" />
          <template v-if="isLogin"> Register with GitHub </template>
          <template v-else> Register with Google </template>
        </UButton>
      </div>
    </UCard>
  </div>
</template>
