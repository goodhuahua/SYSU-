<template>
  <div class="table-box">
    <div class="title">
      <h2>用户管理中心</h2>
    </div>
    <div class="query-box">
      <el-input
        class="query-input"
        v-model="queryInput"
        placeholder="请输入用户名称搜索"
        @change="handleQueryName"
      />
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="id" label="ID" width="100" />
      <el-table-column prop="userName" label="用户名" />
      <el-table-column prop="phone" label="电话" width="150" />
      <el-table-column prop="fans" label="粉丝" width="150" />
      <el-table-column prop="following" label="关注" width="150" />
      <el-table-column prop="create_at" label="创建时间" width="150" />
      <el-table-column prop="update_at" label="修改时间" width="150" />

      <el-table-column label="操作" width="100px">
        <template v-slot="scope">
          <el-button @click="MoreDetailed(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      style="display: flex; justify-content: center; margin-top: 10px"
      v-model:current-page="curPage"
      @current-change="handleChangePage"
    />
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, inject } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
let queryInput = ref("");
let tableData = ref([
  {
    create_at: "",
    update_at: "",
    id: "",
    userName: "",
    phone: "",
    fans: "",
    following: "",
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
  let res = await axios.get(`/admin/userList?pageNum=${cur}&pageSize=${10}`);
  // console.log(res);
  tableData.value = [];
  res.data.data.list.forEach((item) => {
    tableData.value.push({
      create_at: item.CreatedAt,
      update_at: item.UpdatedAt,
      id: item.ID,
      userName: item.UserName,
      phone: item.PhoneNumber,
      fans: item.Fans,
      following: item.Following.length - 1,
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

const MoreDetailed = (row) => {
  router.push({
    path: "/others",
    query: {
      id: row.id,
    },
  });
};

const handleQueryName = async (val) => {
  if (val.length > 0) {
    let res = await axios.get(`/admin/userName/${val}`);
    if (res.data.code == 200) {
      message.success(res.data.msg);
      console.log(res.data.data);
      tableData.value = [
        {
          create_at: res.data.data[0].CreatedAt,
          update_at: res.data.data[0].UpdatedAt,
          id: res.data.data[0].ID,
          userName: res.data.data[0].UserName,
          phone: res.data.data[0].PhoneNumber,
          fans: res.data.data[0].Fans,
          following: res.data.data[0].Following.length - 1,
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
  width: 1200px;
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
