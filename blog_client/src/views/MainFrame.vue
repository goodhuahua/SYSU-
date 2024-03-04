<template>
  <div class="svg"></div>
  <div>
    <div
      style="position: fixed; top: 0; height: 50px; width: 100%; z-index: 999"
    >
      <div class="card">
        <n-popselect
          @update:value="searchByCategory"
          v-model:value="selectedCategory"
          :options="categoryOptions"
          trigger="click"
        >
          <n-button
            text
            style="position: absolute; left: 50px; top: 22px; font-size: 18px"
            >{{ categoryName }}</n-button
          >
        </n-popselect>
        <div
          style="
            display: flex;
            margin: 0 auto;
            max-width: 960px;
            padding: 15px 0;
          "
        >
          <n-input
            v-model:value="pageInfo.keyword"
            round
            placeholder="请输入关键字"
            style="background-color: #f0f5f9"
          />
          <n-button @click="loadArticles(0)" round color="#0b9a2f">
            <template #icon>
              <n-icon>
                <search />
              </n-icon>
            </template>
            搜索
          </n-button>
          <n-button
            v-if="store.hasLogin && !store.isTeacher"
            style="position: fixed; right: 50px"
            @click="goArticle(0)"
            round
            color="green"
          >
            提问箱
          </n-button>
          <n-button
            v-if="store.hasLogin && store.isTeacher"
            style="position: fixed; right: 50px"
            @click="goAnswer(0)"
            round
            color="green"
          >
            问题列表
          </n-button>
        </div>
      </div>
    </div>

    <div
      style="position: fixed; top: 0; height: 50px; width: 100%; z-index: 999"
    >
      <TopBar></TopBar>
    </div>
    <div class="tabs">
      <n-card hoverable embedded :bordered="false">
        <n-list clickable>
          <n-list-item
            @click="toDetail(article)"
            class="article-item"
            hover
            style="margin-bottom: 10px"
            v-for="(article, index) in articleList"
            :key="index"
          >
            <template #prefix>
              <n-image
                width="200"
                :src="`${serverUrl}${article.head_image} `"
              />
            </template>
            <n-thing :title-extra="article.created_at">
              <template #header>
                <h2 style="margin: 0">{{ article.title }}</h2>
              </template>
              <n-divider style="margin-top: 0" />
              <div v-html="article.content"></div>
            </n-thing>
          </n-list-item>
        </n-list>
        <n-pagination
          style="margin-top: 20px"
          @update:page="loadArticles"
          v-model:page="pageInfo.pageNum"
          :page-count="pageInfo.pageCount"
        />
      </n-card>
    </div>
  </div>
</template>

<script setup>
import TopBar from "../components/TopBar.vue";
import { ref, reactive, inject, onMounted, computed } from "vue";
import { Search } from "@vicons/ionicons5";
import config from "../config";
import { UserStore } from "../stores/UserStore";
import { useRouter, useRoute } from "vue-router";
import axios from "../request";

const { serverUrl } = config;
const router = useRouter();
const route = useRoute();
const message = inject("message");
const selectedCategory = ref(0);
const categoryOptions = ref([]);
const articleList = ref([]);

const pageInfo = reactive({
  pageNum: 1,
  pageSize: 5,
  pageCount: 0,
  count: 0,
  keyword: "",
  categoryId: 0,
});

onMounted(() => {
  loadArticles();
  loadCategories();
});
const store = UserStore();

const loadArticles = async (pageNum = 0) => {
  if (pageNum != 0) {
    pageInfo.pageNum = pageNum;
  }
  let res = await axios.post(
    `/article/list?keyword=${pageInfo.keyword}&pageNum=${pageInfo.pageNum}&pageSize=${pageInfo.pageSize}&categoryId=${pageInfo.categoryId}`
  );
  if (res.data.code == 200) {
    articleList.value = res.data.data.article;
  }
  pageInfo.count = res.data.data.count;
  pageInfo.pageCount =
    parseInt(pageInfo.count / pageInfo.pageSize) +
    (pageInfo.count % pageInfo.pageSize > 0 ? 1 : 0);
  console.log(pageInfo.pageNum, pageInfo.pageCount, pageInfo.count);
};

const loadCategories = async () => {
  let res = await axios.get("/category");
  console.log(res);
  categoryOptions.value = (res.data.data.categories || []).map((item) => {
    return {
      label: item.categoryName,
      value: item.id,
    };
  });
};

const categoryName = computed(() => {
  let selectedOption = categoryOptions.value.find((option) => {
    return option.value == selectedCategory.value;
  });
  console.log(selectedOption);
  return selectedOption ? selectedOption.label : "分类";
});

const searchByCategory = (categoryId) => {
  pageInfo.categoryId = categoryId;
  pageInfo.pageNum = 1;
  loadArticles();
};

const toDetail = (article) => {
  router.push({
    path: "/detail",
    query: {
      id: article.id,
    },
  });
};
const goAnswer = () => {
  router.push({
    path: "/answer",
  });
};

const goArticle = () => {
  router.push({
    path: "/teacher",
  });
};
</script>

<style lang="scss" scoped>
.card {
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  margin: auto;
  height: 60px;
  background: white;
  box-shadow: 0px 1px 3px #d3d4d8;
  border-radius: 5px;
}

.tabs {
  position: absolute;
  top: 150px;
  left: 0;
  right: 0;
  margin: auto;
  width: 1000px;
  height: auto;
  background: white;
  box-shadow: 0px 1px 3px #d3d4d8;
  border-radius: 5px;
}
.article-item {
  // background-color: rgba(0, 128, 0, 0.24);
  padding: 10px;
  border-radius: 10px;
  :deep(p) {
    margin: 0 !important;
    padding: 0;
  }
}

.svg {
  width: 1875px;
  height: 1440px;
  border: 1px solid steelblue;
  background-image: url(bg.svg); // 当成背景引入
}
</style>
