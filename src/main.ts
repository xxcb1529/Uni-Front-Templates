import { createSSRApp } from "vue";
import App from "./App.vue";
import * as Pinia from "pinia";
import router from './router'
export function createApp() {
  const app = createSSRApp(App);
  app.use(Pinia.createPinia());
  app.use(router)
  return {
    app,
    Pinia,
  };
}
