<template>
  <div class="table-box">
    <div class="title">
      <h2>个人中心</h2>
    </div>
    <div class="query-box">
      <el-button type="success" round @click="EditInfo">编辑</el-button>
    </div>
    <div>
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        :model="form"
        style="max-width: 460px"
      >
        <el-form-item label="用户名">
          <el-input disabled v-model="form.userName" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input disabled v-model="form.password" />
        </el-form-item>
        <el-form-item label="ID">
          <el-input disabled v-model="form.ID" />
        </el-form-item>
      </el-form>
    </div>
    <el-dialog v-model="dialogFormVisible" title="修改信息">
      <el-form :model="tableForm">
        <el-form-item label="用户名" :label-width="90">
          <el-input v-model="tableForm.userName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" :label-width="90">
          <el-input v-model="tableForm.password" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="dialogConfirm"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from "vue";
const axios = inject("axios");
const message = inject("message");
let form = ref({
  userName: "",
  password: "",
  ID: "",
});
const tableForm = ref({
  userName: "",
  password: "",
});
const dialogFormVisible = ref(false);
const admin = ref({
  id: 0,
});
onMounted(() => ALoadAdmin());
const ALoadAdmin = async () => {
  let res = await axios.get("/admin");
  if (res.data.code == 200) {
    admin.value.id = res.data.data.id;
    form.value.ID = admin.value.id;
    ALoadDetailedInfo(form.value.ID);
  }
};

const ALoadDetailedInfo = async (id) => {
  let res = await axios.get("admin/briefInfo/" + id);
  console.log(res.data.data);
  if (res.data.code == 200) {
    form.value.userName = res.data.data.name;
    form.value.password = res.data.data.password;
  }
};

const modifyName = async (id) => {
  let res = await axios.put("admin/name/" + id, {
    userName: tableForm.value.userName,
  });
  if (res.data.code == 200) {
    message.success(res.data.msg);
    form.value.userName = tableForm.value.userName;
  } else {
    message.error(res.data.msg);
  }
};

const modifyPassword = async (id) => {
  let res = await axios.put("admin/password/" + id, {
    password: tableForm.value.password,
  });
  if (res.data.code == 200) {
    message.success(res.data.msg);
    form.value.password = tableForm.value.password;
  } else {
    message.error(res.data.msg);
  }
};

const EditInfo = () => {
  tableForm.value = {
    userName: form.value.userName,
    password: form.value.password,
  };
  dialogFormVisible.value = true;
};
const dialogConfirm = async () => {
  dialogFormVisible.value = false;
  await modifyName(form.value.ID);
  await modifyPassword(form.value.ID);
};
</script>

<style scoped>
.table-box {
  width: 800px;
  margin: 200px auto;
}
.title {
  text-align: left;
}
.query-box {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>
