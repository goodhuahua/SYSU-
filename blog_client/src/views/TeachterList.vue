<template>
  <!-- 导入并使用TopBar组件 -->
  <TopBar></TopBar>
  <!-- <div class="container" style="max-width: 1000px; margin: 0 auto;margin-top :10px">-->
  <div class="svg">
    <div style="max-width: 1000px; margin: 0 auto; margin-top: 10px">
      <n-card hoverable>
        <template #header>
          <!-- 卡片的标题 -->
          <div
            style=" background: #cec;
                    padding: 10px;
                    font-size: 20px;
                    color: #fff;border-radius: 10px;margin: 10px; 0"
          >
            请选择老师进行匿名提问~~~~~~
          </div>
        </template>

        <n-grid x-gap="12" :cols="4">
          <!-- 循环遍历teachers数组并显示每个教师 -->
          <n-gi class="green" v-for="(item, index) in teachers" :key="index">
            <n-avatar
              style="cursor: pointer"
              @click="askQuestion(item)"
              round
              :size="75"
              :src="serverUrl + item.avatar"
            />
            <div
              style="margin: 10px 0; font-size: 18px"
              class="t-title"
              @click="askQuestion(item)"
            >
              <n-button
                style="margin: 10px 0; font-size: 18px"
                tag="div"
                text
                >{{ item.userName }}</n-button
              >
            </div>
            <n-button @click="askQuestion(item)" type="primary" size="small"
              >提问</n-button
            >
            <n-button
              @click="follow(item.id)"
              style="margin-left: 15px"
              type="info"
              size="small"
              >关注</n-button
            >
          </n-gi>
        </n-grid>
      </n-card>
    </div>
  </div>
</template>
<script setup>
import TopBar from "../components/TopBar.vue";
import { ref, onMounted, inject } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "../request";
const router = useRouter();
const route = useRoute();
const teachers = ref([]);
const serverUrl = inject("serverUrl");
const message = inject("message");

// 处理向教师提问的函数
const askQuestion = (item) => {
  router.push({ path: `/teacher/${item.id}/ask` });
};

//处理关注函数
const follow = async (id) => {
  let res1 = await axios.put("following/new/" + id);
  console.log(res1);
  message.success("关注成功");
};

// 当组件挂载时，获取教师列表数据
onMounted(() => {
  axios.get("/teacher/list").then((res) => {
    const { data, code } = res.data;
    console.log(data, code);
    if (code === 200) {
      teachers.value = data.list || [];
    }
  });
});
</script>

<style scoped>
.light-green {
  height: 108px;
  background-color: rgba(0, 128, 0, 0.12);
}

.green {
  background-color: rgba(0, 128, 0, 0.24);
  padding: 20px;
  margin-bottom: 10px;
  text-align: center;
  border-radius: 10px;
}

.svg {
  width: 1920px;
  height: 1000px;
  border: 1px solid steelblue;
  background-image: url(bg.svg); /* The image used */
  background-size: cover; /* Added this line */
}
</style>
