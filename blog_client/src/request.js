import axios from "axios"; // 引入axios
import { createDiscreteApi } from "naive-ui";
const instance = axios.create({
  timeout: 5000,
  baseURL: "http://localhost:8080",
});

const { message } = createDiscreteApi(["message"]);
// 拦截器传token
instance.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("token") || "";
  if (token.length > 0) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});
instance.interceptors.response.use(
  (res) => {
    const { code, msg } = res.data;
    if (code !== 200) {
      //message.error("请求遇到了错误")
      return Promise.reject(msg);
    }
    return res;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    message.error(`请求遇到了错误:${error.response.status}`);
    return Promise.reject(error);
  }
);

export default instance;
