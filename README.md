# taro-vue3-framework

taro-vue3-framework

## Feature

| 名称                                      |
| ----------------------------------------- |
| eslint + husky + commitlint + lint-staged |
| tailwindcss                               |
| axios                                     |
| pinia                                     |

## eslint + husky + commitlint + lint-staged

### eslint

`package.json`

```json
"scripts": {
  "lint": "eslint --ext .js,.ts,.jsx,.tsx src"
}
```

`settings.json`

```json
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
},
```

### husky + commitlint

```
1. npm install husky --save-dev

2. npx husky install

3. package.json
"scripts": {
  "prepare": "husky install",
}

4. npx husky add .husky/pre-commit "npx lint-staged"

5. npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'

6. npm install @commitlint/cli @commitlint/config-conventional --save-dev

7. `commitlint.config.js`
module.exports = {
  extends: ['@commitlint/config-conventional']
};
```

### lint-staged

```
1. npm install lint-staged --save-dev

2. package.json
"lint-staged": {
  "*.(js|ts|jsx|tsx)": "eslint --cache"
}
```

## tailwindcss

### 安装

`npm install -D tailwindcss postcss autoprefixer`
`npx tailwindcss init`

### 配置

`postcss.config.js`

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

`tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{html,js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

`src/assets/styles/app.scss`

```scss
@import "tailwindcss/base";
@import "tailwindcss/utilities";
```

`config/index.js`

```ts
const { UnifiedWebpackPluginV5 } = require('weapp-tailwindcss-webpack-plugin')

{
  mini: {
    webpackChain(chain, webpack) {
      chain.merge({
        plugin: {
          install: {
            plugin: UnifiedWebpackPluginV5,
            args: [{
              appType: 'taro'
            }]
          }
        }
      })
    }
  }
}
```

### 使用

```vue
<div class="my-[32px] h-[2000px] text-red-700 text-center">
  tailwindcss
</div>
```

## axios

### 安装

`npm install axios --save`
`npm install axios-taro-adapter --save`

### 配置

`src/packages/axios/index.ts`

```ts
import Taro from "@tarojs/taro";
import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";
import business from "./business";

// 创建请求
const service: any = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
  },
  timeout: 1000 * 20,
  transformRequest: [
    (data: AxiosRequestConfig) => {
      return JSON.stringify(data);
    },
  ],
  transformResponse: [
    (data: AxiosRequestConfig) => {
      if (typeof data === "string" && (data as "").startsWith("{")) {
        return JSON.parse(data);
      }
      return {};
    },
  ],
});

// 声明一个 Map 用于存储每个请求的标识 和 取消函数
const pending = new Map();
/**
 * 添加请求
 * @param {Object} config
 */
const addPending = (config: AxiosRequestConfig) => {
  const url = [
    config.method,
    config.url,
    qs.stringify(config.params),
    qs.stringify(config.data),
  ].join("&");
  // eslint-disable-next-line no-param-reassign
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pending.has(url)) {
        // 如果 pending 中不存在当前请求，则添加进去
        pending.set(url, cancel);
      }
    });
};
/**
 * 移除请求
 * @param {Object} config
 */
export const removePending = (config: AxiosRequestConfig) => {
  const url = [
    config.method,
    config.url,
    qs.stringify(config.params),
    qs.stringify(config.data),
  ].join("&");
  if (pending.has(url)) {
    // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
    const cancel = pending.get(url);
    cancel(url);
    pending.delete(url);
  }
};

/**
 * 请求拦截器
 */
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 请求开始对之前的请求做检查取消操作
    removePending(config);

    // 将当前请求添加到 pending 中
    addPending(config);

    // 开启进度条
    Taro.showLoading();

    // 根据业务拦截请求
    return business.request(config);
  },
  (error) => {
    console.log("request error:::", error);
  }
);

/**
 * 响应拦截器
 */
service.interceptors.response.use(
  (response) => {
    // 在请求结束后，移除本次请求
    removePending(response);

    // 关闭进度条
    Taro.hideLoading();

    // 根据业务拦截响应
    return business.response(response);
  },
  (error) => {
    // 关闭进度条
    Taro.hideLoading();
    if (axios.isCancel(error)) return {};

    // HTTP 异常
    error.response && business.error(error.response);

    return Promise.reject(error);
  }
);

/**
 * 清空 pending 中的请求（在路由跳转时调用）
 */
export const clearPending = () => {
  // eslint-disable-next-line no-restricted-syntax
  for (const [url, cancel] of pending) {
    cancel(url);
  }
  pending.clear();
};

export default service;
```

`src/packages/axios/business.ts`

```ts
import { AxiosRequestConfig, AxiosResponse } from "axios";
import qs from "qs";
import { removePending } from "./index";

const config = {
  /**
   * 拦截请求处理相应的业务逻辑
   * @param request
   * @returns request
   */
  request(request: AxiosRequestConfig) {
    /**
     * 处理 POST 请求参数
     */
    this.setupPostParams(request);

    /**
     * 处理特殊参数
     */
    this.setupSpecialParams(request);

    /**
     * 处理 access_token
     * 设置白名单接口不作处理
     */
    this.setupAccessToken(request);

    return request;
  },

  /**
   * 拦截响应处理相应的业务逻辑
   * @param response
   * @returns response
   */
  response(response: AxiosRequestConfig) {
    switch (response.data.code) {
      // 请求成功
      case 0:
      case 200:
        return response.data;
      // 登陆失效
      case 401:
      case 12401104:
        console.error(response.data.message);
        this.jumpLogin();
        break;
      // 请求失败
      default:
        console.error(response.data.message);
        break;
    }

    return false;
  },

  /**
   * HTTP 请求异常
   */
  error(response: AxiosResponse) {
    switch (response.status) {
      case 404:
        console.error((response as any).config.url);
        break;
      case 500:
        switch (response.data.code) {
          case 4001:
          case 4002:
            console.error(response.data.message);
            this.jumpLogin();
            break;
          default:
            console.error(response.data.message);
            break;
        }
        break;
      default:
        break;
    }
  },
  setupPostParams(request: AxiosRequestConfig) {
    if (["POST", "PUT"].includes(request.method?.toUpperCase() as string)) {
      request.headers = {
        ...request.headers,
        "Content-Type": "application/json;charset=utf-8",
      };
    }
  },
  setupAccessToken(request: AxiosRequestConfig): AxiosRequestConfig | void {
    // 白名单
    const whiteList = [""];
    if (whiteList.includes(request.url as string)) {
      return request;
    }
    return request;
  },
  setupSpecialParams(request: AxiosRequestConfig) {
    if (request.params?.extends) {
      // 打开新窗口访问 get 请求
      if (
        request.method?.toUpperCase() === "GET" &&
        request.params.extends?.target === "_blank"
      ) {
        delete request.params.extends;
        window.open(`${request.url}?${qs.stringify(request.params)}`);
        removePending(request);
      }
      delete request.params.extends;
    }
    if (request.data?.extends) {
      // 打开新窗口访问 get 请求
      if (
        request.method?.toUpperCase() === "POST" &&
        request.data.extends?.contentType
      ) {
        request.headers = {
          ...request.headers,
          "Content-Type": request.data.extends?.contentType,
        };
      }
      delete request.data.extends;
    }
  },
  jumpLogin() {
    console.log("jumpLogin");
  },
};

export default config;
```

### 加载中动画

`index.html`;

```

<div id="loading"></div>
```

`src/assets/styles/common.scss`

```scss
#loading {
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  &::after {
    position: absolute;
    content: "";
    top: 50%;
    left: 50%;
    width: 38px;
    height: 38px;
    margin: -19px 0 0 -19px;
    border: 4px solid #323232;
    border-top-color: transparent;
    border-radius: 100%;
    animation: circle infinite 0.75s linear;
  }
}

@keyframes circle {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
```

### 使用

`src/api/common/index.ts`

```ts
import request from "@/packages/axios";

export const GetCommonConfig = () => {
  return request.get("http://yapi.syy.dongchali.cn/mock/730/home/list");
};
```

`src/pages/home/index.vue`

```ts
import { GetCommonConfig } from "@/api/common";
const res = await GetCommonConfig();
console.log("data:::", res);
```

## pinia

### 安装

`npm install --save pinia`

### 配置

`app.ts`

```ts
import { createPinia } from "pinia";

const pinia = createPinia();
App.use(pinia);
```

`src/store/common.ts`

```ts
import { defineStore } from "pinia";

const useStoreCommon = defineStore("STORE_COMMON", {
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
```

### 使用

`*.vue`

```vue
<template>
  <l-layout :header="false"> 版本号: {{ USE_STORE_COMMON.version }} </l-layout>
</template>

<script setup lang="ts">
import useStoreCommon from "@/store/common";
const USE_STORE_COMMON = useStoreCommon();

setTimeout(() => {
  USE_STORE_COMMON.changeVersion("v2.0");
}, 3000);
</script>
```
