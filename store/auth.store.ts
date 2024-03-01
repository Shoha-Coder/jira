import { defineStore } from "pinia";
interface User {
  email: string;
  name: string;
  status: boolean;
  id: string;
}
const initialState: { user: User } = {
  user: {
    email: "",
    name: "",
    id: "",
    status: false,
  },
};
export const useAuthStore = defineStore("auth", {
  state: () => initialState,
  getters: {
    currentUser: (state) => state.user,
    userId: (state) => state.user.id,
  },
  actions: {
    set(user: User) {
      this.$patch({ user });
    },
    clear() {
      this.$patch(initialState);
    },
  },
});
