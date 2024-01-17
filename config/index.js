import Components from "unplugin-vue-components/webpack";
import AutoImport from "unplugin-auto-import/webpack";
import NutUIResolver from "@nutui/nutui-taro/dist/resolver";
const path = require("path");
const { UnifiedWebpackPluginV5 } = require("weapp-tailwindcss-webpack-plugin");

const config = {
  projectName: "xxxxxx",
  date: "2023-4-25",
  designWidth(input) {
    if (input?.file?.replace(/\\+/g, "/").indexOf("@nutui") > -1) {
      return 375;
    }
    return 750;
  },
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1,
  },
  alias: {
    "@": path.resolve(__dirname, "..", "src"),
  },
  sourceRoot: "src",
  outputRoot: "dist",
  plugins: ["@tarojs/plugin-html"],
  defineConstants: {},
  copy: {
    patterns: [],
    options: {},
  },
  framework: "vue3",
  compiler: {
    type: "webpack5",
    prebundle: { enable: false },
  },
  cache: {
    enable: false, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  sass: {
    data: `@import "@nutui/nutui-taro/dist/styles/variables.scss";`,
    resource: [path.resolve(__dirname, "..", "src/assets/styles/theme.scss")],
  },
  mini: {
    enableExtract: true,
    miniCssExtractPluginOption: {
      ignoreOrder: true,
    },
    optimizeMainPackage: {
      enable: true,
    },
    webpackChain(chain) {
      chain.plugin("unplugin-vue-components").use(
        Components({
          resolvers: [NutUIResolver({ taro: true })],
        })
      );
      chain.plugin("unplugin-auto-import").use(
        AutoImport({
          imports: ["vue", "pinia"],
          dts: "types/auto-import.d.ts",
        })
      );
      chain.merge({
        plugin: {
          install: {
            plugin: UnifiedWebpackPluginV5,
            args: [{ appType: "taro" }],
          },
        },
      });
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          // selectorBlackList: ['nut-']
        },
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
  },
  h5: {
    webpackChain(chain) {
      chain.plugin("unplugin-vue-components").use(
        Components({
          resolvers: [NutUIResolver({ taro: true })],
        })
      );
      chain.plugin("unplugin-auto-import").use(
        AutoImport({
          imports: ["vue", "vue-router", "pinia"],
          dts: "types/auto-import.d.ts",
        })
      );
    },
    publicPath: process.env.NODE_ENV === "development" ? "/" : "./",
    staticDirectory: "static",
    esnextModules: ["nutui-taro", "icons-vue-taro"],
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
  },
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === "development") {
    return merge({}, config, require("./dev"));
  }
  return merge({}, config, require("./prod"));
};
