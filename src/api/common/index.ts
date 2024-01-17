import request from "@/packages/request";

export const GetCommonConfig = () => {
  return request.get("http://yapi.syy.dongchali.cn/mock/730/home/list");
};
