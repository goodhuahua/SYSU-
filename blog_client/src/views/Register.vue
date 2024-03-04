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
      <div @click="toLogin" class="button2">
        <div style="position: absolute; left: 22px">登录</div>
      </div>
      <div class="button1">
        <div style="position: absolute; left: 22px">注册</div>
      </div>
    </div>
    <n-form ref="formRef" :rules="rules" :model="user">
      <n-form-item
        path="userName"
        style="position: absolute; left: 70px; top: 110px; width: 350px"
      >
        <n-input
          v-model:value="user.userName"
          size="large"
          round
          placeholder="用户名"
        />
      </n-form-item>
      <n-form-item
        path="password"
        style="position: absolute; left: 70px; top: 175px; width: 350px"
      >
        <n-input
          v-model:value="user.password"
          size="large"
          round
          type="password"
          placeholder="密码"
        />
      </n-form-item>
      <n-form-item
        path="repeatPassword"
        style="position: absolute; left: 70px; top: 240px; width: 350px"
      >
        <n-input
          v-model:value="user.repeatPassword"
          size="large"
          round
          type="password"
          placeholder="重新输入密码"
        />
      </n-form-item>
      <n-form-item
        path="email"
        style="position: absolute; left: 70px; top: 305px; width: 350px"
      >
        <n-input
          v-model:value="user.email"
          size="large"
          round
          placeholder="邮箱"
        />
      </n-form-item>
      <n-form-item
        path="code"
        style="position: absolute; left: 70px; top: 370px; width: 350px"
      >
        <n-input
          v-model:value="user.code"
          size="large"
          round
          placeholder="验证码"
        />
        <div
          class="get-code"
          @click="getCode"
          style="position: absolute; left: 230px; top: 0px"
        >
          <n-button size="large" round>获取验证码</n-button>
        </div>
      </n-form-item>
    </n-form>
    <div @click="submit" class="button3">
      <div style="left: auto; right: auto; text-align: center">注册</div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, inject } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "../request";
const router = useRouter();
const message = inject("message");

const formRef = ref(null);
const user = reactive({
  userName: "",
  email: "",
  password: "",
  repeatPassword: "",
  code: "",
});

function validatePasswordSame(rule, value) {
  return value == user.password;
}

let rules = {
  userName: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    {
      min: 3,
      max: 20,
      message: "用户名长度在 3 到 20 个字符",
      trigger: "blur",
    },
  ],
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
  repeatPassword: [
    { required: true, message: "请重新输入密码", trigger: "blur" },
    {
      validator: validatePasswordSame,
      message: "两次输入的密码不一致",
      trigger: "blur",
    },
  ],
  code: [
    { required: true, message: "请输入验证码", trigger: "blur" },
    { min: 4, max: 4, message: "验证码长度为 4 个字符", trigger: "blur" },
  ],
};
function getCode() {
  if (user.email.split(" ").join().length === 0) {
    message.error("邮箱不能为空");
    return;
  }
  sendCode();
}
const sendCode = async () => {
  let res = await axios.post("/sendCode", {
    email: user.email,
  });
  console.log(res);
  console.log(user.email);
  if (res.data.code == 200) {
    message.success(res.data.msg);
  } else {
    message.error(res.data.msg);
  }
};

function submit() {
  formRef.value?.validate((errors) => {
    if (errors) {
      message.error("注册失败");
    } else {
      register();
    }
  });
}

const register = async () => {
  let res = await axios.post("/register", {
    userName: user.userName,
    email: user.email,
    password: user.password,
    code: user.code,
  });
  console.log(res);
  if (res.data.code == 200) {
    message.success(res.data.msg);
    router.push({
      path: "login",
      query: {
        email: user.email,
        password: user.password,
      },
    });
  } else {
    message.error(res.data.msg);
  }
};

const toLogin = () => {
  router.push("/login");
};
</script>

<style lang="scss" scoped>
.background {
  .rectangle1 {
    position: absolute;
    margin-left: -160px;
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
.person {
  position: absolute;
  left: 80px;
  top: 70px;
  z-index: -1;
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
    left: 150px;
    width: 80px;
    height: 40px;
    border-radius: 20px;
    background-color: #06921b;
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
    top: 465px;
    left: 70px;
    width: 350px;
    height: 50px;
    border-radius: 20px;
    background-color: #066d20;
    line-height: 50px;
    font-size: 16px;
    color: white;
    cursor: pointer;
  }

  .get-code {
    position: absolute;
    top: 0px;
    right: 0px;
    width: 100px;
    height: 40px;
    border-radius: 20px;
    line-height: 40px;
    font-size: 16px;
    color: white;
    cursor: pointer;
  }
}
</style>
