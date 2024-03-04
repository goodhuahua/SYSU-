<template>
  <!--顶部标题栏设计-->
  <div class="topbar">
    <text
      style="position: absolute; left: 100px; line-height: 50px; color: #4408eb"
      >标题</text
    >
    <n-input
      v-model:value="addNotice.title"
      round
      placeholder="请输入标题"
      style="
        position: absolute;
        left: 165px;
        top: 8px;
        width: 900px;
        background-color: #f3f0f9;
      "
    />
    <div style="position: absolute; right: 50px; top: 8px">
      <n-button round color="#0b9a2f" @click="showModalModal">
        <template #icon>
          <n-icon>
            <send />
          </n-icon>
        </template>
        发布
      </n-button>
    </div>
  </div>
  <!--富文本编辑器插入-->
  <div class="tabs">
    <n-card>
      <rich-text-editor
        v-model:modelValue="addNotice.content"
      ></rich-text-editor>
    </n-card>
  </div>
  <!--标题头像处理-->
  <n-modal v-model:show="showModal">
    <div style="width: 400px; height: 450px; background: white">
      <n-card title="封面" :bordered="false">
        <div
          v-if="!newHeadImage"
          style="width: 300px; height: 150px; margin: 0 auto"
        >
          <n-upload
            multiple
            directory-dnd
            :max="1"
            @before-upload="beforeUpload"
            :custom-request="customRequest"
          >
            <n-upload-dragger>
              <div style="margin-bottom: 12px">
                <n-icon size="48" :depth="3">
                  <archive-icon />
                </n-icon>
              </div>
              <n-text style="font-size: 16px"> 点击或者拖动图片到此处 </n-text>
            </n-upload-dragger>
          </n-upload>
        </div>
        <div v-else style="width: 230px; margin: 0 auto">
          <n-image
            height="150"
            width="300"
            :src="serverUrl + addNotice.headImage"
          />
          <n-button
            @click="deleteImage"
            circle
            style="position: absolute; left: 298px; top: 50px"
            color="#383838"
          >
            <template #icon>
              <n-icon><close /></n-icon>
            </template>
          </n-button>
        </div>
      </n-card>

      <n-card title="分类" :bordered="false">
        <div style="width: 300px; margin: 0 auto">
          <n-select
            v-model:value="addNotice.categoryId"
            :options="categoryOptions"
            placeholder="请选择分类"
          />
        </div>
      </n-card>
      <div style="position: absolute; right: 100px; bottom: 30px">
        <n-button type="default" @click="closeSubmitModal"> 取消 </n-button>
      </div>
      <div style="position: absolute; right: 30px; bottom: 30px">
        <n-button type="primary" @click="submit"> 确认 </n-button>
      </div>
    </div>
  </n-modal>
</template>

<script setup>
import { ref, reactive, inject, onMounted } from "vue";
import RichTextEditor from "../components/RichTextEditor.vue";
import { ArchiveOutline as ArchiveIcon } from "@vicons/ionicons5";
import { Send } from "@vicons/ionicons5";
import { Close } from "@vicons/ionicons5";

const serverUrl = inject("serverUrl");
const axios = inject("axios");
const message = inject("message");

const login = ref(false);
const admin = reactive({
  avatarUrl: "",
  id: 0,
});
const categoryOptions = ref([]);
const addNotice = reactive({
  id: 0,
  categoryId: 0,
  title: "",
  content: "",
  headImage: "",
});
const showModal = ref(false);
const newHeadImage = ref(false);

onMounted(() => {
  loadAvatar();
  loadCategories();
});

const loadAvatar = async () => {
  let res = await axios.get("/admin");
  console.log(res);
  if (res.data.code == 200) {
    admin.avatarUrl = serverUrl + res.data.data.avatar;
    admin.id = res.data.data.id;
    login.value = true;
  }
};

const loadCategories = async () => {
  let res = await axios.get("/category");
  console.log(res);
  categoryOptions.value = res.data.data.categories.map((item) => {
    return {
      label: item.categoryName,
      value: item.id,
    };
  });
};

const showModalModal = () => {
  showModal.value = true;
};

const closeSubmitModal = () => {
  showModal.value = false;
};

const beforeUpload = async (data) => {
  if (data.file.file?.type !== "image/png") {
    message.error("只能上传png格式的图片");
    return false;
  }
  return true;
};

const customRequest = async ({ file }) => {
  const formData = new FormData();
  formData.append("file", file.file);
  let res = await axios.post("/upload", formData);
  console.log(res);
  addNotice.headImage = res.data.data.filePath;
  newHeadImage.value = true;
};

const deleteImage = () => {
  addNotice.headImage = "";
  newHeadImage.value = false;
};

const submit = async () => {
  let res = await axios.post("/admin/notice/add", {
    category_id: addNotice.categoryId,
    title: addNotice.title,
    content: addNotice.content,
    head_image: addNotice.headImage,
  });
  console.log(res);
  if (res.data.code == 200) {
    message.success(res.data.msg);
  } else {
    message.error(res.data.msg);
  }
};
</script>

<style lang="scss" scoped>
.topbar {
  position: sticky;
  top: 0;
  height: 50px;
  background: white;
  box-shadow: 0px 1px 5px #d3d4d8;
}
.tabs {
  position: absolute;
  top: 150px;
  left: 150px;
  right: 0;
  margin: auto;
  width: 1020px;
  height: auto;
  background: rgb(240, 240, 240);
  box-shadow: 0px 1px 3px #d3d4d8;
  border-radius: 5px;
}
</style>
