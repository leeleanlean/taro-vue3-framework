import { defineStore } from "pinia";

const useStoreCommon = defineStore("COMMON", {
  state: () => {
    return {
      // 版本号
      version: "v1.0",
    };
  },
  actions: {
    changeVersion(v: string) {
      this.version = v;
    },
  },
});
export default useStoreCommon;
