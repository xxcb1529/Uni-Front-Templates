import pagesJson from "@/pages.json";
import { normalizePagePath } from "@/utils/route";

/** 登录页 path（非 tabBar，禁止对其使用 switchTab） */
export const LOGIN_PATH = "/pages/login/index";

/** 与 LOGIN_PATH 一致，便于旧代码与 uni-mini-router 习惯命名 */
export const loginPage = LOGIN_PATH;

/** 从 pages.json 派生的 tabBar 页面 path（单一数据源，避免手写漂移） */
export const TAB_BAR_PAGE_PATHS: string[] = (
  pagesJson.tabBar?.list ?? []
).map((item) => normalizePagePath(item.pagePath));

/**
 * 游客可访问 path（无 token 时守卫放行）。
 * 含首页以便未登录时可 pushTab 进首页；不含「用户」tab 则点「用户」会进登录。
 */
export const GUEST_WHITE_LIST: string[] = [
  LOGIN_PATH,
];
