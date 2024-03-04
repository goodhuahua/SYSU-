import { createRouter, createWebHashHistory } from "vue-router";
import { UserStore } from "../stores/UserStore";
import store from "../stores/store";
import axios from "../request";
let routes = [
  {
    path: "/login",
    component: () => import("../views/Login.vue"),
    meta: { guest: true },
  },
  {
    path: "/register",
    component: () => import("../views/Register.vue"),
    meta: { guest: true },
  },
  {
    path: "/",
    component: () => import("../views/MainFrame.vue"),
    meta: { guest: true },
  },
  { path: "/publish", component: () => import("../views/Publish.vue") },
  { path: "/myself", component: () => import("../views/Myself.vue") },
  { path: "/others", component: () => import("../views/Others.vue") },
  { path: "/detail", component: () => import("../views/Detail.vue") },
  { path: "/update", component: () => import("../views/Update.vue") },
  { path: "/comments", component: () => import("../views/Comment.vue") },
  { path: "/adminLogin", component: () => import("../views/AdminLogin.vue") },
  { path: "/notice", component: () => import("../views/Notice.vue") },
  {
    path: "/noticeDetail",
    component: () => import("../views/NoticeDetail.vue"),
  },
  {
    path: "/adminCenter",
    component: () => import("../adminViews/AdminCenter.vue"),

    children: [
      {
        path: "/userInfo",
        component: () => import("../adminViews/UserInfo.vue"),
      },
      {
        path: "/infoCenter",
        component: () => import("../adminViews/InfoCenter.vue"),
      },
      {
        path: "/commentInfo",
        component: () => import("../adminViews/CommentInfo.vue"),
      },
      {
        path: "/cateInfo",
        component: () => import("../adminViews/CateInfo.vue"),
      },
      {
        path: "/adminInfo",
        component: () => import("../adminViews/AdminInfo.vue"),
      },
      {
        path: "/artInfo",
        component: () => import("../adminViews/ArtInfoCenter.vue"),
      },
      {
        path: "/noticePublish",
        component: () => import("../adminViews/NoticeInfo.vue"),
      },
      {
        path: "/noticeCenter",
        component: () => import("../adminViews/NoticeCenter.vue"),
      },
    ],
  },
  { path: "/teacher", component: () => import("../views/TeachterList.vue") },
  {
    path: "/teacher/:id/ask",
    component: () => import("../views/AskQuestion.vue"),
  },
  { path: "/answer", component: () => import("../views/TeacherAnswer.vue") },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
const userStore = UserStore(store);
router.beforeResolve((to, form, next) => {
  const { path, name, meta } = to;
  if (userStore.hasLogin) {
    next();
    return;
  }
  if (meta.guest) {
    next();
    return;
  }
  if (path.startsWith("/adminLogin") || path.startsWith("/adminCenter")) {
    next();
    return;
  }
  axios
    .get("/user")
    .then((res) => {
      if (res.data.code == 200) {
        userStore.setUser(res.data.data);
        userStore.setLogined(true);
        next();
        return;
      }
      if (name == "home") {
        next();
        return;
      }
      router.push({ path: "/login" });
      return;
    })
    .catch((_) => {
      next();
    });
});

export { router, routes }; // routes暂时用不上
