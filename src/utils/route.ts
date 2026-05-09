/** 与路由守卫、白名单一致：页面 path 一律为 / 开头 */
export function normalizePagePath(path?: string) {
  if (!path) return "";
  const p = path.split("?")[0];
  return p.startsWith("/") ? p : `/${p}`;
}
