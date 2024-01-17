<template>
  <view class="login w-[100wh] h-[100vh] px-[60rpx] bg-[#ffffff]">
    <!-- title -->
    <h2 class="pt-[106rpx] text-[60rpx] font-[500] leading-[1.65]">登录系统</h2>
    <!-- form -->
    <view class="mt-[106rpx]">
      <view
        v-for="item in forms"
        :key="item.title"
        :class="{ 'mt-[46rpx]': true }"
      >
        <view class="mt-[16rpx]">
          <nut-input
            v-model="form[item.prop]"
            :type="item.type"
            clearable
            clear-size="16"
            class="!p-[0rpx] !pl-[12rpx] h-[96rpx] flex items-center !bg-[#f7f8fa] !border-0 rounded-[8rpx]"
            :placeholder="item.placeholder"
          />
        </view>
      </view>
      <view class="mt-[48rpx]">
        <nut-button type="primary" block shape="square" class="!rounded-[8rpx]">
          登录系统
        </nut-button>
      </view>
      <view
        class="mt-[44rpx] text-center text-[#666666]"
        @click="useJumpPath('/pages/_forget-password/index', 'redirectTo')"
      >
        忘记密码?
      </view>
    </view>
    <!-- bottom -->
    <view
      class="fixed left-0 right-0 bottom-[120rpx] text-center flex justify-center items-center"
    >
      <view>还没有账号?</view>
      <view
        class="p-[8rpx] color-primary"
        @click="useJumpPath('/pages/_register/index', 'redirectTo')"
      >
        注册账号
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useJumpPath } from "@/hooks/useJumpPath";

const form = reactive<{ phone: string; password: string }>({
  phone: "",
  password: "",
});
const forms = [
  {
    title: "手机号码",
    prop: "phone",
    type: "digit",
    placeholder: "请输入手机号码",
  },
  {
    title: "密码",
    prop: "password",
    type: "password",
    placeholder: "请输入密码 (8-16位字母数字组合)",
  },
];
</script>
