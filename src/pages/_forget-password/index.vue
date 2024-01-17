<template>
  <view class="login w-[100wh] h-[100vh] px-[60rpx] bg-[#ffffff]">
    <!-- title -->
    <h2 class="pt-[106rpx] text-[60rpx] font-[500] leading-[1.65]">找回密码</h2>
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
          >
            <template #right v-if="item.title === '验证码'">
              <nut-button type="primary" size="small">获取验证码</nut-button>
            </template>
          </nut-input>
        </view>
      </view>
      <view class="mt-[48rpx]">
        <nut-button type="primary" block shape="square" class="!rounded-[8rpx]">
          提交
        </nut-button>
      </view>
    </view>
    <!-- bottom -->
    <view
      class="fixed left-0 right-0 bottom-[120rpx] text-center flex justify-center items-center"
    >
      <view
        class="p-[8rpx] color-primary"
        @click="useJumpPath('/pages/_login/index', 'redirectTo')"
      >
        登录系统
      </view>
      <nut-divider direction="vertical" />
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

const form = reactive<{
  phone: string;
  code: string;
  newPassword: string;
  newPasswordRepeat: string;
}>({
  phone: "",
  code: "",
  newPassword: "",
  newPasswordRepeat: "",
});
const forms = [
  {
    title: "手机号码",
    prop: "phone",
    type: "digit",
    placeholder: "请输入手机号码",
  },
  {
    title: "验证码",
    prop: "code",
    type: "digit",
    placeholder: "请输入验证码",
  },
  {
    title: "设置新密码",
    prop: "newPassword",
    type: "password",
    placeholder: "请输入密码 (8-16位字母数字组合)",
  },
  {
    title: "重复新密码",
    prop: "newPasswordRepeat",
    type: "password",
    placeholder: "请重复密码 (8-16位字母数字组合)",
  },
];
</script>
