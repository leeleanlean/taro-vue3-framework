export default defineAppConfig({
  pages: [
    // home
    "pages/home/index",

    // develop
    "pages/develop/index/index",
    "pages/develop/tour/index",
    "pages/develop/card/index",
    "pages/develop/home-1/index",

    // _login
    "pages/_login/index",
    // _register
    "pages/_register/index",
    // _forget-password
    "pages/_forget-password/index",
  ],
  window: {
    backgroundColor: "#f7f8fa",
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    color: "#a9aeb8",
    selectedColor: "#165dff",
    list: [
      {
        pagePath: "pages/home/index",
        text: "首页",
        iconPath: "./assets/images/menus/home-unselected.png",
        selectedIconPath: "./assets/images/menus/home-selected.png",
      },
      {
        pagePath: "pages/develop/index/index",
        text: "开发",
        iconPath: "./assets/images/menus/develop-unselected.png",
        selectedIconPath: "./assets/images/menus/develop-selected.png",
      },
    ],
  },
});
