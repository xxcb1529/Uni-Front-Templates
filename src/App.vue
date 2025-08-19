<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { beforEach } from "./router";
onLaunch(() => {
  console.log("App Launch");
});
onShow((options) => {
  console.log("App Show");
  setTimeout(() => {
    const currentPage = options.path;
    beforEach(
      { path: "/" },
      { path: currentPage, fullPath: currentPage },
      (data) => {
        if (data?.path) {
          uni.redirectTo({ url: data.path });
        }
      }
    );
  }, 100);
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style lang="scss"></style>
