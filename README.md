# Uni-Front-Templates

uni-app（Vue 3 + Vite + TypeScript）团队脚手架：基于文件的页面（`@uni-helper/vite-plugin-uni-pages`）、Pinia 持久化、`uni-mini-router` 守卫、`wot-design-uni` 组件与可配置 HTTP 封装。

## 环境要求

- Node.js 18+
- pnpm（推荐）

## 快速开始

```bash
pnpm install
cp .env.example .env.development   # 或直接使用已提交的 .env.development
pnpm dev:h5
# 或微信小程序：pnpm dev:mp-weixin
```

### pnpm 提示 approve-builds

若安装时提示需批准依赖脚本，本地执行 `pnpm approve-builds` 按需勾选。

## 目录说明

| 路径 | 说明 |
| --- | --- |
| [src/config/auth.ts](src/config/auth.ts) | 登录页路径、游客白名单、从 `pages.json` 派生的 tabBar 路径（**改鉴权策略先看这里**） |
| [src/router/index.ts](src/router/index.ts) | `uni-mini-router`、全局 `beforeEach` |
| [src/utils/http.ts](src/utils/http.ts) | 请求拦截与 `http()` 封装（baseURL / 业务成功码 / Token 前缀等由环境变量控制） |
| [src/utils/navigation.ts](src/utils/navigation.ts) | `navigateToLogin()`，`reLaunch` 到登录页 |
| [src/pages.json](src/pages.json) | 页面与 tabBar 配置（与 `pages.config.ts` 生成结果一致） |

## 路由与鉴权约定

- **游客白名单** `GUEST_WHITE_LIST`：无 token 时仍可访问的页面 path（`/` 前缀）。默认包含登录页与首页；**「用户」tab 不在白名单**，未登录进入会要求登录。
- **tabBar 页**必须使用 **`router.pushTab`**（底层 `switchTab`）。对非 tabBar 页使用 `pushTab` 会在小程序报错。
- **守卫与 `switchTab` 冲突**：若在未登录时对 tab 目标发起 `pushTab`，但守卫要把目标改成**登录页**（非 tabBar），会得到 `switchTab:fail can not switch to no-tabBar page`。因此要么把游客需要的 tab 页加入白名单，要么业务侧未登录时不要对受保护 tab 使用 `pushTab`，改为 `reLaunch` 到登录。

### `App.onShow` 与 `router.beforeEach`

- `router.beforeEach`：通过 `uni-mini-router` 发起的跳转（如 `push` / `pushTab`）会走守卫。
- [src/App.vue](src/App.vue) 在 `onShow` 中再调用一次同一套 `beforEach`，用于**冷启动 / 从后台切回**等场景的兜底校验；若需跳转登录，统一走 `navigateToLogin()`（`reLaunch`），避免与 `redirectTo` 栈行为不一致。

### 跳转登录

业务里 401、退出登录请使用 [navigateToLogin](src/utils/navigation.ts)，与 HTTP 封装保持一致。

## 环境变量（`.env.example`）

| 变量 | 说明 |
| --- | --- |
| `VITE_API_BASE_URL` | 接口根地址 |
| `VITE_API_SUCCESS_CODE` | 业务成功码，多个用英文逗号分隔 |
| `VITE_API_AUTH_BEARER` | `true` 时 `Authorization: Bearer <token>` |
| `VITE_API_SOURCE_HEADER_KEY` / `VITE_API_SOURCE_HEADER_VALUE` | 客户端标识请求头 |

本地覆盖可建 `.env.local`（已 gitignore）。

## 演示流程

1. **登录页**「游客进首页」：未登录仍可 `pushTab` 到首页（首页在白名单内）。
2. **登录页**「模拟登录」：写入假 token 后 `pushTab` 到首页。
3. **用户页**「退出并回登录」：清空登录态并 `reLaunch` 到登录页。
4. **用户页**「测试 http」：示例请求（失败会走统一错误 / 401 处理）。

## 类型检查

```bash
pnpm run type-check
```

当前依赖中 **wot-design-uni** 等与 Vue 3.5 / `vue-tsc` 组合可能触发大量类型报错（含 `node_modules` 内 `.vue`）。`--skipLibCheck` 与 `tsconfig` 中的 `skipLibCheck` 仍无法完全规避。**模板侧不以通过全量 `vue-tsc` 为硬性前提**；若在 CI 中使用类型检查，可考虑仅对关键子集开闸或后续升级 UI 库 / 锁 Vue 小版本再收紧。

```bash
pnpm run type-check:skip-lib
```

## 代码风格

```bash
pnpm run lint
pnpm run lint:fix
pnpm run format
```

## 构建

```bash
pnpm run build:h5
pnpm run build:mp-weixin
```

更多脚本见 [package.json](package.json)。
