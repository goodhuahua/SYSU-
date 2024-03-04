<template>
  <div class="container">
    <div class="topbar">
      <div class="begintitle" @click="toMain">
        <img src="../assets/image/SYSUBBS.png" />
      </div>

      <div class="bigtitle" @click="toMain">首页</div>
      <div class="weather-container">
        <div class="weather-input">
          <input v-model="city" placeholder="请输入城市" class="custom-input" />
          <n-button text color="#0b9a2f" @click="getWeather">
            <n-icon><TrainOutline /> </n-icon>此处天气如何?
          </n-button>
        </div>
      </div>

      <div class="weathertitle" style="top: 5px">
        <n-button @click="toggleCard">
          <n-icon size="30" color="#0b9a2f" :depth="1">
            <Calendar />
          </n-icon>
        </n-button>
        <div v-if="card">
          <n-card style="position: absolute; top: 50px; width: 500px">
            <n-calendar
              v-model:value="value"
              @update:value="handleUpdateValue"
              #="{ year, month, date }"
            >
              {{ year }}-{{ month }}-{{ date }}
            </n-calendar>
          </n-card>
        </div>
      </div>

      <n-dropdown
        v-if="login"
        trigger="hover"
        :options="options"
        @select="handleSelect"
      >
        <n-avatar
          @click="toHome"
          round
          size="medium"
          :src="user.avatarUrl"
          style="position: absolute; right: 190px; top: 8px; cursor: pointer"
        />
      </n-dropdown>
      <div v-if="!login" class="admintitle" @click="toAdminLogin">
        管理员登录
      </div>
      <div v-if="!login" class="smalltitle" @click="toLogin">登录/注册</div>
      <div v-if="!login" class="smallnotice" @click="toNotice">公告列表</div>
      <div v-if="login" class="notice" @click="toNotice">公告列表</div>
      <div style="position: absolute; right: 50px; top: 8px">
        <n-button round color="#0b9a2f" @click="toPublish">发布文章</n-button>
      </div>
      <div>
        <div v-if="weather && Object.keys(weather).length > 0">
          <!--天气图标展示 -->
          <div>
            <div style="position: absolute; top: 5px; left: 580px">
              <n-icon size="40" color="#0b9a2f" :depth="1">
                <SunnyOutline v-if="weather.weather === '晴'" />
                <PartlySunny v-else-if="weather.weather === '多云'" />
                <RainyOutline v-else-if="weather.weather === '雨'" />
                <Cloudy v-else-if="weather.weather === '阴'" />
                <!-- 其它情况全部值为阴天 -->
                <Cloudy v-else />
              </n-icon>
            </div>
          </div>
          <!-- 天气信息展示 -->
          <div style="position: absolute; top: 5px; left: 650px">
            <n-gradient-text
              :gradient="{
                from: 'rgb(85, 85, 85)',
                to: 'rgb(170, 170, 170)',
              }"
            >
              城市：{{ weather.city }}
            </n-gradient-text>
            <br />
            <n-gradient-text
              :gradient="{
                deg: 180,
                from: 'rgb(85, 85, 85)',
                to: 'rgb(170, 170, 170)',
              }"
            >
              天气：{{ weather.weather }} 温度:{{ weather.temperature }}
            </n-gradient-text>
          </div>
        </div>
      </div>
      <div>
        <i class="xi-home"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, inject, onMounted, computed } from "vue";
import {
  SunnyOutline,
  PartlySunny,
  RainyOutline,
  TrainOutline,
  Cloudy,
  Calendar,
} from "@vicons/ionicons5";
// import '../CSS/xicons.scss'
import { useRouter, useRoute } from "vue-router";
import { UserStore } from "../stores/UserStore";
const router = useRouter();

const userStore = UserStore();
const serverUrl = inject("serverUrl");
const axios = inject("axios");
const message = inject("message");
const store = UserStore();

const instance = axios.create({
  withCredentials: true,
});

const card = ref(false);
const handleUpdateValue = (_, { year, month, date }) => {};

const route = useRoute();

const options = reactive([
  { label: "退出登录", key: "login" },
  { label: "管理员登录", key: "adminLogin" },
]);
const login = computed(() => {
  return store.hasLogin;
});
const user = reactive({
  avatarUrl: "",
  id: 0,
});
const city = ref("珠海"); // 设置初始值为 "珠海"

onMounted(async () => {
  await getWeather(), loadAvatar(); // 在 onMounted 钩子中调用 getWeather 函数
  if (userStore.logined == false) {
    let res = await instance.get("/vcookie");
    console.log(res);
    userStore.token = res.data.data.token;
    window.localStorage.setItem("token", res.data.data.token);

    axios.get("/user").then((result) => {
      if (result.data.code !== 200) {
        message.error(res.data.msg);
        return;
      }
      userStore.setUser(result.data.data);
      userStore.setLogined(true);
      //router.push("/")
    });
  }
});
// 添加在onMounted(() => { ... })后面
const weather = ref(null);
const proxy = "http://localhost:8000/";

const getWeather = async () => {
  if (!city.value.trim()) {
    message.error("输入栏不能为空");
    return;
  }
  try {
    const geoResponse = await axios.get(`/weather?address=${city.value}`);
    const weatherData = geoResponse.data.data.weather;
    console.log(geoResponse);
    weather.value = {
      city: weatherData.city,
      weather: weatherData.weather,
      temperature: weatherData.temperature + "℃",
    };
  } catch (e) {
    message.error("获取天气信息失败，请检查输入的城市");
  }
};

const toggleCard = () => {
  card.value = !card.value;
};

// 关于点击就下拉的实现
const showDropdown = ref(false);
function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}
function hideDropdown() {
  showDropdown.value = false;
}
const userInfo = computed(() => {
  return store.userInfo;
});

const loadAvatar = async () => {
  let res = await axios.get("/user");
  console.log(res);
  if (res.data.code == 200) {
    user.avatarUrl = serverUrl + res.data.data.avatar;
    user.id = res.data.data.id;
    login.value = true;
  }
};

const toMain = () => {
  router.push("/");
};
const avatar = computed(() => {
  return userInfo.value.avatar ? `${serverUrl}/${userInfo.value.avatar}` : "";
});

const toLogin = () => {
  router.push("/login");
};

const toAdminLogin = () => {
  router.push("/adminLogin");
};

const toNotice = () => {
  router.push("/notice");
};

const toHome = () => {
  router.push({
    path: "/myself",
    query: {
      id: userInfo.value.id,
    },
  });
};

const toPublish = () => {
  if (login.value == false) {
    message.warning("请先登录");
  } else {
    router.push("/publish");
    console.log("123");
  }
};

const handleSelect = (key) => {
  if (key === "login") {
    store.setLogined(false);
    window.localStorage.removeItem("token");
  }
  router.push("/" + String(key));
};
</script>

<style lang="scss" scoped>
.custom-input {
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 4px 12px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #0b9a2f;
  }
}
.weather-trigger {
  cursor: pointer;
  font-size: 14px;
}
.container {
  .topbar {
    position: sticky;
    top: 0;
    height: 50px;
    background: white;
    box-shadow: 0px 1px 5px #d3d4d8;
    .begintitle {
      position: absolute;
      left: 15px;
      line-height: 40px;
      color: #0b9a2f;
      cursor: pointer;
    }

    .bigtitle {
      font-weight: bold;
      position: absolute;
      font-size: 20px;
      left: 220px;
      line-height: 50px;
      color: #0b9a2f;
      cursor: pointer;
    }
    .smalltitle {
      position: absolute;
      font-size: 16px;
      right: 175px;
      line-height: 50px;
      color: #0b9a2f;
      cursor: pointer;
    }
    .smallnotice {
      position: absolute;
      font-size: 16px;
      right: 405px;
      line-height: 50px;
      color: #068435;
      cursor: pointer;
    }
    .notice {
      position: absolute;
      font-size: 16px;
      right: 250px;
      line-height: 50px;
      color: #0b9a2f;
      cursor: pointer;
    }
    .admintitle {
      position: absolute;
      font-size: 16px;
      right: 300px;
      line-height: 50px;
      color: #0b9a2f;
      cursor: pointer;
    }
  }
  .weathertitle {
    position: absolute;
    font-size: 16px;
    right: 500px;
    line-height: 50px;
    color: #0b9a2f;
    cursor: pointer;
  }

  .weather-container {
    position: absolute;
    left: 280px;
    top: 8px;
    .weather-input {
      align-items: center;
      display: flex;
      .n-input {
        width: 100px;
      }
    }
    .weather-info {
      display: inline-block;
      margin-left: 10px;
      p {
        margin: 0;
        font-size: 14px;
      }
    }
  }
}
</style>
