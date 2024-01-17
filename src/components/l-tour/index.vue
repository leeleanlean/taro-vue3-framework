<template>
  <view class="l-tour">
    <nut-tour class="l-tour" v-model="visible" :steps="steps"></nut-tour>
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
const visible = ref(false);
const open = () => (visible.value = true);
defineProps<{ steps: any }>();
defineExpose({ open });
</script>
