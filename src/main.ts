import { createSSRApp } from "vue";
import App from "./App.vue";
import * as Pinia from "pinia";
import pinia from "./stores";
import router from "./router";
import "@/utils/http";

export function createApp() {
  const app = createSSRApp(App);
  app.use(pinia);
  app.use(router);
  return {
    app,
    Pinia,
  };
}
