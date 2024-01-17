<template>
  <view
    :class="[`l-card p-[32px]`, contentClass]"
    :style="{
      borderRadius: rounded,
      boxShadow: shadow,
      marginTop: `${top}px`,
      marginBottom: `${bottom}px`,
      backgroundColor: `${background}`,
    }"
  >
    <!-- header -->
    <view v-if="header">
      <slot name="header"></slot>
    </view>
    <view
      v-if="!header && title"
      class="flex justify-between items-center h-[32px] mb-[32px]"
    >
      <h3 class="text-[32px] font-[500]">{{ title }}</h3>
      <slot name="more"></slot>
    </view>
    <!-- content -->
    <view class="content">
      <slot></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
    rounded?: string;
    shadow?: string;
    top?: number;
    bottom?: number;
    background?: string;
    contentClass?: string;
  }>(),
  {
    title: "",
    rounded: "6px",
    shadow: "0 1px 8px 0 rgb(237, 238, 241)",
    top: 0,
    bottom: 16,
    background: "#ffffff",
    contentClass: "",
  }
);

const header = !!useSlots().header;
</script>
