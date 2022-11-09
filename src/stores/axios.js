import { defineStore } from "pinia";

export const use = defineStore("axios", {
  state: () => {
    return {
      axios: null,
    };
  },
});
export const useAxios = () => {
  const store = use();
  return store.axios;
};
