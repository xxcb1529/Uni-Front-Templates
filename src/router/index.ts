import { createRouter } from 'uni-mini-router'
// 导入pages.json
import pagesJson from '../pages.json'
// 引入uni-parse-pages
import pagesJsonToRoutes from 'uni-parse-pages'
import { useMemberStore } from '@/stores/index'
// 生成路由表
const routes = pagesJsonToRoutes(pagesJson)
setRouteName(routes)
const router = createRouter({
  routes: [...routes], // 路由表信息
})
export const whiteList = ['/pages/login/index']
export const loginPage = '/pages/login/index'

export const beforEach = (to, from, next) => {
  const userStore = useMemberStore()
  if (userStore.profile?.token) {
    // 有登录态
    next(true)
  } else {
    // 无登录态
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next({ path: loginPage })
    }
  }
}
// 全局前置守卫
router.beforeEach(beforEach)

// 路由的最后一级为路由名字不可重复
function setRouteName(routes) {
  routes.forEach((item) => {
    if (item.path) {
      const name = item.path.split('/').pop()
      item.name = name
    }
  })
}
export default router
