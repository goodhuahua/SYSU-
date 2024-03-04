<template>
  <div class="table-box">
    <div class="title">
      <h2>管理员管理中心</h2>
    </div>
    <div class="query-box">
      <el-input
        class="query-input"
        v-model="queryInput"
        placeholder="请输入管理员名称搜索"
        @change="handleQueryName"
      />
      <el-button type="primary" @click="handleAdd">添加管理员</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="create_at" label="创建时间" width="150" />
      <el-table-column prop="update_at" label="修改时间" width="150" />
      <el-table-column prop="id" label="ID" width="100" />
      <el-table-column prop="userName" label="用户名" />
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      style="display: flex; justify-content: center; margin-top: 10px"
      v-model:current-page="curPage"
      @current-change="handleChangePage"
    />

    <el-dialog v-model="dialogFormVisible" title="添加管理员">
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
import axios from "axios";
import { ref, inject } from "vue";
let queryInput = ref("");
let tableData = ref([
  {
    create_at: "",
    update_at: "",
    id: "",
    userName: "",
  },
]);
let dialogFormVisible = ref(false);
let tableForm = ref({
  userName: "",
  password: "",
});
let total = ref(10);
let curPage = ref(1);
const message = inject("message");

const getTableData = async (cur = 1) => {
  let res = await axios.get(`/admin/adminList?pageNum=${cur}&pageSize=${10}`);
  tableData.value = [];
  res.data.data.list.forEach((item) => {
    tableData.value.push({
      create_at: item.CreatedAt,
      update_at: item.UpdatedAt,
      id: item.ID,
      userName: item.UserName,
    });
  });
  console.log(res.data.data.list);
  total.value = res.data.data.total;
  curPage.value = res.data.data.pageNum;
};

getTableData(1);

const handleChangePage = (val) => {
  getTableData(curPage.value);
};
const handleAdd = () => {
  dialogFormVisible.value = true;
  tableForm.value = {};
};

const dialogConfirm = async () => {
  dialogFormVisible.value = false;
  let res = await axios.post("/admin/addAdmin", {
    userName: tableForm.value.userName,
    password: tableForm.value.password,
  });
  if (res.data.code == 200) {
    message.success(res.data.msg);
    getTableData(curPage);
  } else {
    message.error(res.data.msg);
  }
};

const handleQueryName = async (val) => {
  if (val.length > 0) {
    let res = await axios.get(`/admin/adminName/${val}`);
    if (res.data.code == 200) {
      message.success(res.data.msg);
      console.log(res.data.data);
      tableData.value = [
        {
          create_at: res.data.data[0].CreatedAt,
          update_at: res.data.data[0].UpdatedAt,
          id: res.data.data[0].ID,
          userName: res.data.data[0].UserName,
        },
      ];
    } else {
      message.error(res.data.msg);
    }
  } else {
    await getTableData(curPage);
  }
};
</script>

<style scoped>
.table-box {
  width: 900px;
  margin: 100px auto;
}
.title {
  text-align: center;
}
.query-box {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.query-input {
  width: 300px;
}
</style>
