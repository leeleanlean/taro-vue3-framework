import { createApp } from "vue";
import { createPinia } from "pinia";
import "./assets/styles/app.scss";
import { IconFont } from "@nutui/icons-vue";
import "@nutui/icons-vue/dist/style_iconfont.css";
import Taro from "@tarojs/taro";

const App = createApp({
  onShow(options) {
    console.log(options);
    Taro.getSystemInfo({
      success(res) {
        console.log(res);
      },
    });
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
});

// pinia
const pinia = createPinia();
App.use(pinia);
App.use(pinia);
App.use(IconFont);

export default App;
