<template>
  <l-layout>
    <template v-for="item in lists" :key="item.title">
      <nut-cell-group :title="item.title">
        <nut-cell
          v-for="{ title, path } in item.children"
          :key="title"
          :title="title"
          @click="useJumpPath(path)"
        ></nut-cell>
      </nut-cell-group>
    </template>
  </l-layout>
</template>

<script setup lang="ts">
import "./index.scss";
import { useJumpPath } from "@/hooks/useJumpPath";
const lists = [
  {
    title: "基础组件",
    children: [
      {
        title: "卡片",
        path: "/pages/develop/card/index",
      },
    ],
  },
  {
    title: "业务组件",
    children: [
      { title: "登录系统", path: "/pages/_login/index" },
      { title: "注册账号", path: "/pages/_register/index" },
      { title: "找回密码", path: "/pages/_forget-password/index" },
      { title: "引导", path: "/pages/develop/tour/index" },
      { title: "首页-1", path: "/pages/develop/home-1/index" },
    ],
  },
];
</script>
