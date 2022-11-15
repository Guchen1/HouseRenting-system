import { defineStore } from "pinia";

export const useStore = defineStore("user", {
  state: () => {
    return {
      // 所有这些属性都将自动推断其类型
      logged: false,
      identity: null,
      last: null,
      centershow: false,
      name: "顾晨",
      url: "http://localhost:8000",
    };
  },
});
