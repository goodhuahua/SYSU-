<template>
  <div class="svg"></div>
  <div style="position: fixed; top: 0; height: 50px; width: 100%; z-index: 999">
    <TopBar></TopBar>
  </div>

  <div class="tabs">
    <n-card>
      <n-h1>{{ noticeInfo.title }}</n-h1>
      <div style="height: 75px; background-color: #fcfaf7">
        <text style="position: relative; left: 70px; color: #808080"
          >发布时间：{{ noticeInfo.created_at }}
        </text>
        <div style="position: relative; left: 70px; color: #808080">
          公告分类：
          <n-tag type="warning">{{ categoryName }}</n-tag>
        </div>
      </div>
      <n-divider />
      <div class="article-content">
        <div v-html="noticeInfo.content"></div>
      </div>
    </n-card>
  </div>
</template>

<script setup>
import { ref, reactive, inject, onMounted } from "vue";
import TopBar from "../components/TopBar.vue";

import { useRoute } from "vue-router";

const route = useRoute();

const axios = inject("axios");

const noticeInfo = ref({});
const categoryName = ref("");

onMounted(() => {
  loadNotice();
});

const loadNotice = async () => {
  let res1 = await axios.get("notice/" + route.query.id);
  console.log(res1);
  if (res1.data.code == 200) {
    noticeInfo.value = res1.data.data.notice;
    let res2 = await axios.get("category/" + res1.data.data.notice.category_id);
    console.log(res2);
    if (res2.data.code == 200) {
      categoryName.value = res2.data.data.categoryName;
    }
  }
};
</script>

<style lang="scss" scoped>
.tabs {
  position: absolute;
  top: 75px;
  left: 0;
  right: 0;
  margin: auto;
  width: 1000px;
  height: auto;
  background: white;
  box-shadow: 0px 1px 3px #d3d4d8;
  border-radius: 5px;
}

.svg {
  width: 2160x;
  height: 1000px;
  border: 1px solid steelblue;
  background-image: url(wave.svg); // 当成背景引入
}
.article-content img {
  max-width: 100% !important;
}
</style>
