<template>
  <div class="svg">
    <el-container class="layout-container" style="height: 820px">
      <el-aside width="200px" min-height="400px">
        <el-scrollbar>
          <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            default-active="5"
            text-color="#fff"
            router
          >
            <el-menu-item>
              <span class="tit">管理员中心</span>
            </el-menu-item>
            <!--:index="要跳转的路径"-->
            <el-menu-item :index="'/userInfo'">
              <el-icon><User /></el-icon>
              <span>用户信息</span>
            </el-menu-item>
            <el-menu-item :index="'/adminInfo'">
              <el-icon><Avatar /></el-icon>
              <span>管理员信息</span>
            </el-menu-item>
            <el-menu-item :index="'/cateInfo'">
              <el-icon><Promotion /></el-icon>
              <span>分类管理</span>
            </el-menu-item>
            <el-menu-item :index="'/artInfo'">
              <el-icon><List /></el-icon>
              <span>文章信息</span>
            </el-menu-item>
            <el-menu-item :index="'/noticePublish'">
              <el-icon><EditPen /></el-icon>
              <span>公告发布</span>
            </el-menu-item>
            <el-menu-item :index="'/noticeCenter'">
              <el-icon><MessageBox /></el-icon>
              <span>公告管理</span>
            </el-menu-item>
            <el-menu-item :index="'/infoCenter'">
              <el-icon><House /></el-icon>
              <span>个人中心</span>
            </el-menu-item>
          </el-menu>
        </el-scrollbar>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <div class="toolbar">
            <n-dropdown
              v-if="login"
              trigger="hover"
              :options="options"
              @select="handleSelect"
            >
              <n-avatar
                round
                size="medium"
                :src="admin.avatarUrl"
                style="
                  position: absolute;
                  right: 190px;
                  top: 8px;
                  cursor: pointer;
                "
              />
            </n-dropdown>
          </div>
          <n-modal v-model:show="showAvatarModal">
            <div style="width: 600px; height: 320px; background: white">
              <n-card title="修改头像" :bordered="false">
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
                    <n-text style="font-size: 16px">
                      点击或者拖动图片到此处
                    </n-text>
                  </n-upload-dragger>
                </n-upload>
              </n-card>
              <div style="position: absolute; right: 90px; bottom: 20px">
                <n-button type="default" @click="closeAvatarModal">
                  取消
                </n-button>
              </div>
              <div style="position: absolute; right: 20px; bottom: 20px">
                <n-button v-if="newAvatar" @click="modifyAvatar" type="primary">
                  确认
                </n-button>
                <n-button v-else type="primary" disabled> 确认 </n-button>
              </div>
            </div>
          </n-modal>
        </el-header>

        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref, reactive, inject, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
const serverUrl = inject("serverUrl");
const axios = inject("axios");
const message = inject("message");
const router = useRouter();
const route = useRoute();
const showAvatarModal = ref(false);
const options = reactive([
  { label: "退出登录", key: "adminLogin" },
  { label: "修改头像", key: "avatar" },
  { label: "回到首页", key: "" },
]);
const login = ref(false);
const admin = reactive({
  avatarUrl: "",
  id: 0,
});
const newUrl = ref("");
const newAvatar = ref(false);

onMounted(() => {
  ALoadAvatar();
});
const ALoadAvatar = async () => {
  let res = await axios.get("/admin");
  console.log(res);
  if (res.data.code == 200) {
    admin.avatarUrl = serverUrl + res.data.data.avatar;
    admin.id = res.data.data.id;
    login.value = true;
  }
};

const handleSelect = (key) => {
  if (String(key) == "avatar") {
    showAvatarModal.value = true;
  } else if (String(key) == "adminLogin") {
    router.push("/" + String(key));
  } else {
    router.push("/login");
  }
};

//这里是头像上传的代码
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
  newUrl.value = res.data.data.filePath;
  newAvatar.value = true;
};

const modifyAvatar = async () => {
  let res = await axios.put("admin/avatar/" + route.query.id, {
    avatar: newUrl.value,
  });
  console.log(res);
  if (res.data.code == 200) {
    message.success(res.data.msg);
    showAvatarModal.value = false;
    ALoadAvatar();
  } else {
    message.error(res.data.msg);
  }
};
const closeAvatarModal = () => {
  showAvatarModal.value = false;
};
</script>

<style scoped>
.layout-container .el-header {
  background-color: #617086;
  color: #1c1a1a;
}
.layout-container .el-aside {
  background-color: #617086;
  color: #1c1a1a;
}
.layout-container .el-menu {
  background-color: #617086;
  color: #1c1a1a;
  border-right: none;
}
.layout-container .el-main {
  padding: 0;
}
.layout-container .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
.tit {
  color: rgb(13, 13, 13);
  height: 50px;
  width: 50px;
  font-size: 20px;

  left: 25px;
}
.svg {
  width: 1850px;
  height: 900px;

  background-image: url(bg.svg); /* The image used */
  background-size: cover; /* Added this line */
}
</style>
