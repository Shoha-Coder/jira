<script lang="ts" setup>
import { ACCOUNT } from "~/libs/appwrite";
const authStore = useAuthStore();
const loadingStore = useLoadingStore();

onMounted(() => {
  ACCOUNT.get()
    .then((response) =>
      authStore.set({
        email: response.email,
        id: response.$id,
        name: response.name,
        status: response.status,
      })
    )
    .finally(() => loadingStore.set(false));
});
</script>
