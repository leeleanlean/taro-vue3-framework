<template>
  <l-layout title="Tour 引导">
    <l-tour ref="refLTour" :steps="steps">
      <nut-grid class="mt-[100px]">
        <nut-grid-item id="target1" text="1"></nut-grid-item>
        <nut-grid-item id="target2" text="2"></nut-grid-item>
        <nut-grid-item id="target3" text="3"></nut-grid-item>
        <nut-grid-item id="target4" text="4"></nut-grid-item>
      </nut-grid>
    </l-tour>

    <view class="mt-[32px]">
      <nut-button block type="primary" @click="refLTour.open()">
        打开引导
      </nut-button>
    </view>
  </l-layout>
</template>

<script setup lang="ts">
const refLTour = ref();
const steps = ref([
  {
    content: "全新功能引导，九宫格内容介绍 - 1",
    target: "target1",
    location: "right",
  },
  {
    content: "全新功能引导，九宫格内容介绍 - 2",
    target: "target2",
  },
  {
    content: "全新功能引导，九宫格内容介绍 - 3",
    target: "target3",
  },
  {
    content: "全新功能引导，九宫格内容介绍 - 4",
    target: "target4",
    location: "left",
  },
]);
</script>
