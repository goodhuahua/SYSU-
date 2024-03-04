import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import naive from "naive-ui"; // 引入ui框架
import { createDiscreteApi } from "naive-ui"; // 引入createDiscreteApi
import {UserStore} from "./stores/UserStore"; // 引入pinia
import { router } from "./common/router"; // 引入路由
// import axios from "./request"; // 引入axios
import axios from "axios";
//import config from './config'
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { createPinia } from "pinia";

axios.defaults.baseURL = "http://localhost:8080"; // 服务端地址全局配置
const { message, notification, dialog } = createDiscreteApi(["message", "notification", "dialog"])

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.provide("axios", axios); // 将axios全局放入
app.provide("message", message);
app.provide("notification", notification);
app.provide("dialog", dialog);
app.provide("serverUrl", axios.defaults.baseURL);

app.use(naive); // 引入ui框架
app.use(createPinia());
const userStore = UserStore();
axios.interceptors.request.use((config)=>{
  config.headers.authorization = `Bearer ${userStore.token}`;
  return config;
});
app.use(router); // 引入路由
app.mount("#app");
