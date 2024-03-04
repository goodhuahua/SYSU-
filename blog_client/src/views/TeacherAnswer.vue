<template>
  <!-- 顶部栏组件 -->

  <div>
    <TopBar></TopBar>
    <!--<div class="container" style="max-width: 1000px; margin: 0 auto;margin-top :10px">-->

    <n-card>
      <div class="svg">
        <div
          style="
            max-width: 1000px;
            height: 1000px;
            margin: 0 auto;
            margin-top: 10px;
          "
        >
          <!-- 显示已回答问题的数量 -->
          <div>回答过的提问（{{ items.length }})</div>
          <!-- 在获取数据时显示加载动画 -->
          <n-spin :show="loading" size="small" v-if="showList">
            <ul style="list-style: none; padding: 0">
              <!-- 遍历已回答的问题 -->
              <li
                class="answer-item"
                v-for="(item, index) in items"
                :key="index"
              >
                <!-- 显示问题内容 -->
                <p
                  style="margin: 5px 0; font-weight: 700"
                  v-html="item.content"
                ></p>
                <!-- 显示问题创建时间 -->
                <div style="text-align: right; color: #ccc; font-size: 12px">
                  {{ formatTime(item.created_at) }}
                </div>
                <n-divider style="margin: 10px 0" />
                <!-- 如果有回复，则显示回复，否则显示“回复”按钮 -->
                <p
                  style="margin: 5px 0"
                  v-html="item.reply"
                  v-if="item.reply"
                ></p>
                <p style="margin: 5px 0; text-align: right" v-else>
                  <n-button @click="showEdit(item)" size="small" type="info"
                    >回复</n-button
                  >
                </p>
              </li>
            </ul>
          </n-spin>
          <section v-else>
            <!-- 显示当前问题的内容 -->
            <p style="font-size: 16px" v-html="current.content"></p>
            <n-divider style="margin: 10px 0" />
            <!-- 撰写回复 -->
            <RichTextEditor v-model:model-value="content"></RichTextEditor>
            <div style="text-align: center; margin-top: 10px">
              <!-- 提交和取消按钮 -->
              <n-button
                :disabled="content.length === 0"
                @click="submit"
                size="large"
                type="primary"
                >提交</n-button
              >
              <n-button @click="goback" style="margin-left: 20px" size="large"
                >返回</n-button
              >
            </div>
          </section>
        </div>
      </div>
    </n-card>
  </div>
</template>
<script setup>
import { ref, onMounted, inject } from "vue";
import TopBar from "../components/TopBar.vue";
import RichTextEditor from "../components/RichTextEditor.vue";
import axios from "../request";
import dayjs from "dayjs";
import { getText, isNull } from "../util";

const items = ref([]);
const showList = ref(true);
const current = ref({});
const formatTime = (str) => dayjs(str).format("YYYY-MM-DD HH:mm:ss");
const showEdit = (item) => {
  showList.value = false;
  current.value = item;
};
const loading = ref(false);
const content = ref("");
const goback = () => {
  current.value = null;
  showList.value = true;
};
const loadData = () => {
  loading.value = true;
  axios.get("/teacher/reply").then((res) => {
    const { data, code } = res.data;
    if (code === 200) {
      items.value = data.list || [];
    }
    loading.value = false;
  });
};
onMounted(() => {
  loadData();
});
const message = inject("message");
const submit = () => {
  const text = getText(content.value);
  if (isNull(text)) {
    message.error("内容不能为空");
    return;
  }
  axios
    .post("/teacher/reply", {
      question_id: current.value.id,
      content: content.value,
    })
    .then((res) => {
      const { data, code } = res.data;
      if (code === 200) {
        showList.value = true;
        current.value = null;
        showEdit.value = false;
        loadData();
      }
    });
};
</script>
<style lang="scss" scoped>
.answer-item {
  margin-top: 10px;
  background-color: #efe;
  //中大绿
  //background-color: #08802c;
  padding: 10px;
  border-radius: 10px;
  :deep(p) {
    margin: 5px 0;
  }
}

.svg {
  width: 1920px;
  height: 1000px;
  //border: 1px solid steelblue;
  background-image: url(bg.svg); /* The image used */
  background-size: cover; /* Added this line */
}
</style>
