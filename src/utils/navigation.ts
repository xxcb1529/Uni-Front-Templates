import { LOGIN_PATH } from "@/config/auth";

/** 统一跳转登录（401、守卫、退出）；使用 reLaunch 清栈，避免小程序页面栈过深 */
export function navigateToLogin() {
  uni.reLaunch({ url: LOGIN_PATH });
}
