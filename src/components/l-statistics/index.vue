<template>
  <view class="l-statistics flex flex-wrap">
    <dl
      :class="[
        'w-[33.333333%]',
        align,
        {
          'mt-[0px]': index <= 2,
          'mt-[32px]': data.length > 3 && (data.length % 3 === 0 || index >= 3),
        },
      ]"
      v-for="(item, index) in data"
      :key="item.name"
    >
      <dt class="text-[#666666]">{{ item.name }}</dt>
      <dd class="font-[600] text-[40px] mt-[8px]">{{ item.value }}</dd>
    </dl>
  </view>
</template>

<script setup lang="ts">
import "./index.scss";
withDefaults(
  defineProps<{
    data: Array<{ name: string; value: string | number }>;
    align?: "text-left" | "text-center" | "text-right";
  }>(),
  {
    align: "text-left",
  }
);
</script>
