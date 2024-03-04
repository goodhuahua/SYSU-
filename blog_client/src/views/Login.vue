<template>
  <div class="background">
    <img src="../assets/image/rectangle1.png" class="rectangle1" />
    <img src="../assets/image/rectangle2.png" class="rectangle2" />
    <img src="../assets/image/rectangle3.png" class="rectangle3" />
    <img src="../assets/image/rectangle4.png" class="rectangle4" />
    <img src="../assets/image/person.png" class="person" />
  </div>
  <div class="board">
    <div>
      <div @click="toRegister" class="button2">
        <div style="position: absolute; right: 22px">注册</div>
      </div>
      <div class="button1">
        <div style="position: absolute; left: 22px">登录</div>
      </div>
    </div>
    <n-form ref="formRef" :rules="rules" :model="user">
      <n-form-item
        path="email"
        style="position: absolute; left: 70px; top: 150px; width: 350px"
      >
        <n-input
          v-model:value="user.email"
          size="large"
          round
          placeholder="邮箱"
        />
      </n-form-item>
      <n-form-item
        path="password"
        style="position: absolute; left: 70px; top: 230px; width: 350px"
      >
        <n-input
          v-model:value="user.password"
          size="large"
          round
          type="password"
          placeholder="密码"
        />
      </n-form-item>
    </n-form>
    <n-checkbox
      v-model:checked="user.rember"
      label="记住密码"
      style="position: absolute; left: 70px; top: 330px"
    />
    <div @click="submit" class="button3">
      <div style="left: auto; right: auto; text-align: center">登录</div>
    </div>
  </div>
</template>

<script setup>
import { inject, reactive, ref } from "vue";
import { UserStore } from "../stores/UserStore";

import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const axios = inject("axios");
const message = inject("message");
const userStore = UserStore();

const formRef = ref(null);
const user = reactive({
  email: localStorage.getItem("email") || route.query.email || "",
  password: localStorage.getItem("password") || route.query.password || "",
  rember: localStorage.getItem("rember") == 1 || false,
});

let rules = {
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    // {pattern: /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/, message: "邮箱格式不正确", trigger: "blur"}
    {
      pattern: /^[a-zA-Z0-9]+@mail[23]?\.sysu\.edu\.cn$/,
      message: "邮箱格式不正确,请输入中大邮箱",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 20, message: "密码长度在 6 到 20 个字符", trigger: "blur" },
  ],
};

function submit() {
  formRef.value?.validate((errors) => {
    if (errors) {
      message.error("登录失败");
    } else {
      login();
    }
  });
}

const login = async () => {
  let res = await axios.post("/login", {
    email: user.email,
    password: user.password,
  });
  console.log(res);
  if (res.data.code == 200) {
    userStore.token = res.data.data.token;
    window.localStorage.setItem("token", res.data.data.token);
    console.log(res.data.data.token);
    if (user.rember) {
      localStorage.setItem("email", user.email);
      localStorage.setItem("password", user.password);
      localStorage.setItem("rember", user.rember ? 1 : 0);
    } else {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      localStorage.setItem("rember", user.rember ? 1 : 0);
    }
    axios.get("/user").then((result) => {
      if (result.data.code !== 200) {
        message.error(res.data.msg);
        return;
      }
      userStore.setUser(result.data.data);
      userStore.setLogined(true);
      router.push("/");
      message.success(res.data.msg);
    });
  } else {
    message.error(res.data.msg);
  }
  axios.get("/user");

  console.log("user password is   " + user.password);
  let cookieRes = axios.post("/cookie", {
    email: user.email,
    password: user.password,
  });
  console.log(cookieRes);
  let promise = cookieRes;
  promise
    .then((result) => {
      console.log(result); // log the result object
      let token = result.data.data.token;
      console.log(token);
      document.cookie = `token=${token}; path=/; domain=localhost;`;
    })
    .catch((error) => {
      console.error(error); // log any errors that occurred while processing the Promise
    });
};

const toRegister = () => {
  router.push("/register");
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

  .button1 {
    position: absolute;
    top: 75px;
    left: 70px;
    width: 80px;
    height: 40px;
    border-radius: 20px;
    background-color: #08802c;
    line-height: 40px;
    font-size: 16px;
    color: white;
    cursor: default;
  }

  .button2 {
    position: absolute;
    top: 75px;
    left: 70px;
    width: 160px;
    height: 40px;
    border-radius: 20px;
    background-color: #f1ebfb;
    line-height: 40px;
    font-size: 16px;
    color: black;
    cursor: pointer;
  }

  .button3 {
    position: absolute;
    top: 400px;
    left: 70px;
    width: 350px;
    height: 50px;
    border-radius: 20px;
    background-color: rgb(19, 155, 62);
    line-height: 50px;
    font-size: 16px;
    color: white;
    cursor: pointer;
  }
}
</style>
