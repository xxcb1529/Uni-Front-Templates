<template>
  <view class="page">
    <view class="title">用户</view>
    <view v-if="memberStore.profile" class="meta">
      <text>{{ memberStore.profile.nickname || memberStore.profile.account }}</text>
      <text class="sub">{{ memberStore.profile.mobile }}</text>
    </view>
    <view v-else class="meta">
      <text>未登录（点 tab 进入本页会触发守卫逻辑）</text>
    </view>
    <view class="actions">
      <view class="btn" @tap="testHttp">测试 http（示例接口）</view>
      <view class="btn danger" @tap="logout">退出并回登录</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useMemberStore } from "@/stores/modules/member";
import { navigateToLogin } from "@/utils/navigation";
import { http } from "@/utils/http";

const memberStore = useMemberStore();

/** 示例：具体 path 请按后端文档调整 */
const testHttp = async () => {
  try {
    await http<unknown[]>({
      url: "/home/category/head",
      method: "GET",
    });
    uni.showToast({ title: "请求成功", icon: "success" });
  } catch {
    /* http 内已 toast */
  }
};

const logout = () => {
  memberStore.clearProfile();
  navigateToLogin();
};
</script>

<style scoped>
.page {
  padding: 40rpx;
}
.title {
  font-size: 40rpx;
  font-weight: 600;
  margin-bottom: 24rpx;
}
.meta {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
  margin-bottom: 40rpx;
  font-size: 28rpx;
}
.sub {
  color: #888;
  font-size: 24rpx;
}
.actions {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}
.btn {
  padding: 24rpx;
  text-align: center;
  border-radius: 12rpx;
  background: #f0f0f0;
  font-size: 28rpx;
}
.btn.danger {
  background: #ffe8e8;
  color: #c62828;
}
</style>
