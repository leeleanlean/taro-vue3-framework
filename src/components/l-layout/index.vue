<template>
  <!-- left -->
  <view v-if="header" class="layout-navbar flex justify-between items-center">
    <view class="left">
      <template v-if="HeaderLeft">
        <slot name="HeaderLeft"></slot>
      </template>
      <view v-else class="flex items-center">
        <RectLeft @click="back" width="16px"></RectLeft>
      </view>
    </view>
    <view class="center">
      {{ title }}
    </view>
    <view class="right">
      <template v-if="HeaderRight">
        <slot name="HeaderRight"></slot>
      </template>
    </view>
  </view>

  <!-- content -->
  <view
    class="layout-content"
    :class="[{ 'mx-[32px]': !fullX, 'my-[32px]': !fullY }, contentClass]"
    :style="{ paddingTop: header ? '56px' : '0px' }"
  >
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import Taro from "@tarojs/taro";
import { RectLeft } from "@nutui/icons-vue";
import "./index.scss";

withDefaults(
  defineProps<{
    title?: string;
    header?: boolean;
    fullX?: boolean;
    fullY?: boolean;
    contentClass: string;
  }>(),
  {
    title: "",
    header: false,
    fullX: false,
    fullY: false,
    contentClass: "",
  }
);

const { HeaderLeft, HeaderRight } = useSlots();

const back = () => Taro.navigateBack();
</script>
