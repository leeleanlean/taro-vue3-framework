import Taro from "@tarojs/taro";

// 封装请求方法
const request = async (url: string, data: any, method?: any) => {
  showToast("加载中");
  return Taro.request({
    url,
    data,
    method,
    header: {
      "Content-Type": "application/json",
      Authorization: Taro.getStorageSync("user_info")?.access_token,
    },
  })
    .then((res) => {
      Taro.hideToast();
      switch (res.statusCode) {
        case 200:
        case 201:
          return res.data;
          break;
        case 401:
          showToast(`${res.data.message}`);
          jumpLogin();
          break;
        default:
          showToast(`${res.data.message}`);
          throw new Error(`网络请求错误，状态码：${res.statusCode}`);
          break;
      }
    })
    .catch((err) => {
      console.log("err", err);
    });
};

const jumpLogin = () => {
  Taro.clearStorage();
  Taro.reLaunch({ url: "/pages/login/index" });
};
const showToast = (message: string) => {
  Taro.showToast({ title: message, icon: "none" });
};

request.get = (url: string, data?: any) => request(url, data);
request.post = (url: string, data?: any) => request(url, data, "post");
request.put = (url: string, data?: any) => request(url, data, "put");
request.delete = (url: string, data?: any) => request(url, data, "delete");

export default request;
