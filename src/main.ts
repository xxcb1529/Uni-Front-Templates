import { createSSRApp } from "vue";
import uviewPlus from "uview-plus";
import "uview-plus/index.scss";
import App from "./App.vue";
import * as Pinia from "pinia";
export function createApp() {
  const app = createSSRApp(App);
  app.use(uviewPlus as any);
  app.use(Pinia.createPinia());
  return {
    app,
    Pinia,
  };
}
