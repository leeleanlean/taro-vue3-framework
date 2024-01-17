<template>
  <!-- header -->
  <view class="h-[520rpx] bg-primary text-[#ffffff]">
    <view class="p-[32rpx] pt-[180rpx] flex justify-between items-center">
      <dl class="flex items-center">
        <dt class="w-[68rpx] h-[68rpx] bg-[#999999] rounded-[50%]"></dt>
        <dd class="ml-[16rpx]">dd</dd>
      </dl>
      <view>x</view>
    </view>
    <view class="flex justify-around mt-[20rpx]">
      <dl
        v-for="item in [
          { name: '客户数量', total: 1568 },
          { name: '待跟进', total: 568 },
          { name: '已结束', total: 68 },
        ]"
        :key="item.name"
        class="text-center"
      >
        <dt class="text-[30rpx] font-[600]">{{ item.name }}</dt>
        <dd class="text-[36rpx] font-[600]">{{ item.total }}</dd>
      </dl>
    </view>
  </view>
  <!-- radius -->
  <view class="h-[30rpx] bg-primary rounded-br-[32rpx] rounded-bl-[32rpx]" />
  <!-- data -->
  <view class="mx-[32rpx] mt-[-86rpx]">
    <l-card title="常用功能" shadow="none"></l-card>
  </view>

  <!-- <view
    class="mx-[32rpx] py-[52rpx] flex justify-around mt-[-120rpx] bg-[#ffffff] rounded-[16rpx]"
  >
    <dl
      v-for="item in [
        { name: '客户数量', total: 1568 },
        { name: '待跟进', total: 568 },
        { name: '已结束', total: 68 },
        { name: '已结束', total: 68 },
      ]"
      :key="item.name"
      class="text-center"
    >
      <dt class="text-[36rpx] font-[600]">{{ item.total }}</dt>
      <dd class="text-[30rpx] font-[600]">{{ item.name }}</dd>
    </dl>
  </view> -->
</template>

<script setup lang="ts"></script>
