<template>
  <u-swiper :list="list3" indicator indicatorMode="line" circular></u-swiper>
</template>

<script setup lang="ts">
const list3 = [
  "https://cdn.uviewui.com/uview/swiper/swiper3.png",
  "https://cdn.uviewui.com/uview/swiper/swiper2.png",
  "https://cdn.uviewui.com/uview/swiper/swiper1.png",
];
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
