import { createRouter } from "uni-mini-router";
import pagesJson from "../pages.json";
import pagesJsonToRoutes from "uni-parse-pages";
import { GUEST_WHITE_LIST, LOGIN_PATH, loginPage } from "@/config/auth";
import { useMemberStore } from "@/stores/index";

const routes = pagesJsonToRoutes(pagesJson) as Array<{
  path: string;
  name?: string;
}>;

setRouteName(routes);

const router = createRouter({
  routes: [...routes],
});

export const whiteList = GUEST_WHITE_LIST;
export { loginPage, LOGIN_PATH };

export { normalizePagePath } from "@/utils/route";

export const beforEach = (
  to: { path?: string; name?: string },
  from: { path?: string; name?: string },
  next: (options?: boolean | { path: string }) => void
) => {
  const userStore = useMemberStore();
  if (userStore.profile?.token) {
    next(true);
  } else {
    if (to.path && whiteList.includes(to.path)) {
      next();
    } else {
      next({ path: LOGIN_PATH });
    }
  }
};

router.beforeEach(beforEach);

function setRouteName(routes: Array<{ path: string; name?: string }>) {
  routes.forEach((item) => {
    if (item.path) {
      const name = item.path.split("/").pop();
      item.name = name;
    }
  });
}

export default router;
