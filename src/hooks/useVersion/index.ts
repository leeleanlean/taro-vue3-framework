import useStoreCommon from "@/store/common";

export const useVersion = () => {
  const USE_STORE_COMMON = useStoreCommon();
  return USE_STORE_COMMON.version;
};
