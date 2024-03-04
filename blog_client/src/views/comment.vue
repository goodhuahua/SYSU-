<template>
  <div
    style="position: sticky; top: 0; height: 50px; width: 100%; z-index: 999"
  >
    <TopBar></TopBar>
  </div>
  <div class="container">
    <div class="box">
      <div class="article-meta">
        <h1 class="article-title">{{ articleInfo.title }}</h1>
      </div>
      <div class="article-content" v-html="articleInfo.content"></div>
      <span>发布时间：{{ articleInfo.created_at }}</span>
    </div>
    <div class="add-comment">
      <n-input
        v-model:value="addComment.Text"
        round
        placeholder="发表评论"
        class="add-comment-input"
      />
      <n-button
        round
        color="#08802c"
        @click="submit"
        class="add-comment-button"
      >
        <template #icon>
          <n-icon>
            <send />
          </n-icon>
        </template>
        发表
      </n-button>
    </div>
    <div class="comment-list">
      <div v-for="comment in comments" :key="comment.id" class="comment-item">
        <div class="box comment-box">
          <n-avatar
            round
            size="medium"
            :src="getAvatarUrl(comment.authorAvatar)"
            class="comment-avatar"
          />
          <div class="comment-content">
            <div class="comment-text">{{ comment.text }}</div>
            <div class="comment-meta">
              <span
                >发布时间：{{ formatDate(comment.CreatedAt) }} 评论者：{{
                  comment.authorName
                }}</span
              >
            </div>
            <div class="comment-actions">
              <n-button
                @click="toDelete(comment)"
                text
                color="#08802c"
                size="tiny"
                >删除</n-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onMounted, reactive } from "vue";
import TopBar from "../components/TopBar.vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const message = inject("message");
const serverUrl = inject("serverUrl");
const axios = inject("axios");

const articleInfo = ref({});
const comments = ref([]);
const dialog = inject("dialog");
const addComment = reactive({
  Text: "",
});
const commentInfo = ref({});
onMounted(() => {
  loadArticleAndComments();
});

const loadArticleAndComments = async () => {
  const articleId = route.query.id;
  console.log(articleId);

  // 加载文章详情
  const articleRes = await axios.get(`/article/${articleId}`);
  console.log(articleRes.data);
  if (articleRes.data.code === 200) {
    articleInfo.value = articleRes.data.data.article;
  } else {
    // 处理加载文章详情失败的情况
  }

  // 加载评论列表

  const commentsRes = await axios.get(`/comments/${articleId}`);
  console.log(commentsRes.data);
  if (commentsRes.data.code === 200) {
    comments.value = commentsRes.data.data.comments;
    console.log(comments);
  } else {
    // 处理加载评论列表失败的情况
  }
  console.log(comments.value);
};

const submit = async () => {
  console.log(articleInfo.value.id);
  console.log(addComment.Text);
  let res = await axios.post("/comments", {
    article_id: articleInfo.value.id,
    text: addComment.Text,
  });
  console.log(res.data.code);
  if (res.data.code == 200) {
    message.success(res.data.mes);
    console.log(res);
    loadArticleAndComments();
    addComment.Text = "";
  } else {
    message.error(res.data.mes);
  }
};

const goback = () => {
  router.go(-1);
};

const toDelete = async (comment) => {
  console.log(comment);
  dialog.warning({
    title: "警告",
    content: "是否要删除",
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: async () => {
      let res = await axios.delete(`/comments/${comment.ID}`);
      if (res.data.code == 200) {
        message.info(res.data.message);
        loadArticleAndComments();
      } else {
        message.error(res.data.message);
      }
    },
    onNegativeClick: () => {},
  });
};

const getAvatarUrl = (avatarPath) => {
  return serverUrl + avatarPath;
};

const formatDate = (dateString) => {
  let date = new Date(dateString);
  return `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};
</script>

<style scoped>
.container {
  padding: 20px;
}

.box {
  background-color: #ffffff;
  border-radius: 6px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.article-meta {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.article-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.article-content {
  line-height: 1.8;
  white-space: pre-wrap;
}

.add-comment {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.add-comment-input {
  flex: 1;
  margin-right: 10px;
}

.comment-list {
  margin-bottom: 20px;
}

.comment-item {
  margin-bottom: 20px;
}

.comment-box {
  display: flex;
}

.comment-avatar {
  margin-right: 20px;
}

.comment-content {
  flex: 1;
}

.comment-text {
  margin-bottom: 10px;
}

.comment-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 14px;
  color: #777;
}

.comment-actions {
  display: flex;
  align-items: center;
}

.n-button {
  font-weight: bold;
}
</style>
