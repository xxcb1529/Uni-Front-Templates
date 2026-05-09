<route lang="json5" type="page">
    {
        style: {
            navigationBarTitleText: '',
            navigationStyle: 'custom'
        }
    }
</route>
<template>
  <view class="page">
    <view class="actions">
      <view class="btn primary" @tap="gotoIndexAsGuest">游客进首页</view>
      <view class="btn primary" @tap="mockLogin">模拟登录</view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import type { LoginResult } from "@/types/member";
import { useMemberStore } from "@/stores/modules/member";
import { useRouter } from "uni-mini-router";

const router = useRouter();
const memberStore = useMemberStore();

/** tabBar 首页须 pushTab（switchTab） */
const gotoIndexAsGuest = () => {
  router.pushTab({ path: "/pages/index/index" });
};

const mockLogin = () => {
  const profile: LoginResult = {
    id: 1,
    avatar: "https://picsum.photos/100",
    account: "demo",
    nickname: "演示用户",
    mobile: "13800138000",
    token: "demo-token",
  };
  memberStore.setProfile(profile);
  router.pushTab({ path: "/pages/index/index" });
};
</script>
<style scoped>
.page {
  padding: 48rpx;
}
.actions {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}
.btn {
  padding: 28rpx;
  text-align: center;
  border-radius: 12rpx;
  font-size: 30rpx;
}
.btn.primary {
  background: #4c569c;
  color: #fff;
}
</style>
