<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { LOGIN_PATH } from "@/config/auth";
import { navigateToLogin } from "@/utils/navigation";
import { normalizePagePath } from "@/utils/route";
import { beforEach } from "./router";
onLaunch(() => {
  console.log("App Launch");
});
onShow((options) => {
  console.log("App Show");
  setTimeout(() => {
    const toPath = normalizePagePath(options?.path);
    if (!toPath) return;
    beforEach(
      { path: toPath },
      { path: toPath },
      (data) => {
        if (data && typeof data === "object" && "path" in data) {
          if (data.path === LOGIN_PATH) {
            navigateToLogin();
          } else {
            uni.redirectTo({ url: data.path });
          }
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
