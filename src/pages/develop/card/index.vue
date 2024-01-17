<template>
  <l-layout>
    <l-card v-bind="config">
      这里是内容
      <template #more>
        <IconFont name="follow" size="16" color="#e74e3d"></IconFont>
      </template>
    </l-card>
  </l-layout>
</template>

<script setup lang="ts">
import { ILCard } from "@/components/l-card/interface";

const config = reactive<ILCard>({ title: "123" });
</script>
