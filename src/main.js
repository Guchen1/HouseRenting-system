import { createApp } from "vue";
import { createPinia } from "pinia";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import ElementPlus from "element-plus";
import App from "./App.vue";
import router from "./router";
import Particles from "vue3-particles";
import "element-plus/dist/index.css";

// 动画 animate.css
import "animate.css";
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(createPinia());
app.use(Particles);
app.use(router);

app.use(ElementPlus);
app.mount("#app");
