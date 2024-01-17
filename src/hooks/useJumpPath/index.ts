import Taro from "@tarojs/taro";

export const useJumpPath = (
  url: string,
  type?: "switchTab" | "reLaunch" | "redirectTo" | undefined
) => {
  switch (type) {
    case "switchTab":
      Taro.switchTab({ url });
      break;
    case "reLaunch":
      Taro.reLaunch({ url });
      break;
    case "redirectTo":
      Taro.redirectTo({ url });
      break;
    default:
      Taro.navigateTo({ url });
      break;
  }
};
