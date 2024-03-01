<script lang="ts" setup>
import { ACCOUNT } from "~/libs/appwrite";
const { clear } = useAuthStore();
const router = useRouter();
const loadingStore = useLoadingStore();
onMounted(async () => {
  loadingStore.set(true);
  await ACCOUNT.deleteSession("current");
  clear();
  await router.push("/");
  loadingStore.set(false);
});
</script>