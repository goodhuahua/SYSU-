<template>
  <div class="background">
    <img src="../assets/image/rectangle1.png" class="rectangle1" />
    <img src="../assets/image/rectangle2.png" class="rectangle2" />
    <img src="../assets/image/rectangle3.png" class="rectangle3" />
    <img src="../assets/image/rectangle4.png" class="rectangle4" />
    <img src="../assets/image/person.png" class="person" />
  </div>
  <div class="board">
    <div
      style="
        position: absolute;
        left: 200px;
        width: 100px;
        margin-top: 100px;
        font-size: large;
        color: #046b1e;
      "
    >
      管理员登录
    </div>
    <n-form ref="formRef" :rules="rules" :model="admin">
      <n-form-item
        path="userName"
        style="position: absolute; left: 70px; top: 150px; width: 350px"
      >
        <el-icon :size="20" class="svg-container"><User /></el-icon>
        <n-input
          v-model:value="admin.userName"
          size="large"
          round
          placeholder="用户名"
        />
      </n-form-item>
      <n-form-item
        path="password"
        style="position: absolute; left: 70px; top: 230px; width: 350px"
      >
        <el-icon :size="20" class="svg-container"><HomeFilled /></el-icon>
        <n-input
          v-model:value="admin.password"
          size="large"
          round
          type="password"
          placeholder="密码"
        />
      </n-form-item>
    </n-form>
    <n-checkbox
      v-model:checked="admin.rember"
      label="记住密码"
      style="position: absolute; left: 70px; top: 330px"
    />
    <div @click="adminLogin" class="button">
      <div style="left: auto; right: auto; text-align: center">登录</div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, inject } from "vue";
import { UserStore } from "../stores/UserStore";

import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const axios = inject("axios");
const message = inject("message");
const userStore = UserStore();

const formRef = ref(null);
const admin = reactive({
  userName: localStorage.getItem("userName") || route.query.userName || "",
  password: localStorage.getItem("password") || route.query.password || "",
  rember: localStorage.getItem("rember") == 1 || false,
});

let rules = {
  userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 20, message: "密码长度在 6 到 20 个字符", trigger: "blur" },
  ],
};

const adminLogin = async () => {
  let res = await axios.post("/admin/login", {
    userName: admin.userName,
    password: admin.password,
  });
  console.log(res);
  if (res.data.code == 200) {
    userStore.token = res.data.data.token;
    if (admin.rember) {
      localStorage.setItem("userName", admin.userName);
      localStorage.setItem("password", admin.password);
      localStorage.setItem("rember", admin.rember ? 1 : 0);
    } else {
      localStorage.removeItem("userName");
      localStorage.removeItem("password");
      localStorage.setItem("rember", admin.rember ? 1 : 0);
    }
    router.push("/adminCenter");
    message.success(res.data.msg);
  } else {
    message.error(res.data.msg);
  }
};
</script>

<style lang="scss" scoped>
.background {
  .rectangle1 {
    position: absolute;
    left: -160px;
    top: -320px;
    z-index: -1;
  }

  .rectangle2 {
    position: absolute;
    left: 650px;
    top: 0px;
    z-index: -1;
  }

  .rectangle3 {
    position: absolute;
    left: 800px;
    top: -100px;
    z-index: -1;
  }

  .rectangle4 {
    position: absolute;
    left: 1100px;
    top: 450px;
    z-index: -1;
  }

  .person {
    position: absolute;
    left: 80px;
    top: 70px;
    z-index: -1;
  }
}
.board {
  position: absolute;
  top: 95px;
  right: 235px;
  width: 500px;
  height: 550px;
  border-radius: 20px;
  box-shadow: 0px 20px 50px #d3d4d8;
  background-color: white;
  z-index: 0;

  .button {
    position: absolute;
    top: 400px;
    left: 70px;
    width: 350px;
    height: 50px;
    border-radius: 20px;
    background-color: #069229;
    line-height: 50px;
    font-size: 16px;
    color: white;
    cursor: pointer;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: rgb(6, 116, 39);
    vertical-align: middle;
    display: inline-block;
  }
  .svg {
    width: 1875px;
    height: 1440px;
    border: 1px solid steelblue;
    background-image: url(bg.svg); // 当成背景引入
  }
}
</style>
