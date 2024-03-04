<template>
  <div class="table-box">
    <div class="title">
      <h2>公告管理中心</h2>
    </div>
    <div class="query-box">
      <el-input
        class="query-input"
        v-model="queryInput"
        placeholder="请输入公告标题搜索"
        @change="handleQueryName"
      />
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="id" label="ID" width="150" />
      <el-table-column prop="userName" label="作者" width="130" />
      <el-table-column prop="categoryName" label="分类" width="130" />
      <el-table-column prop="title" label="标题" width="180" />
      <el-table-column prop="create_at" label="创建时间" width="200" />
      <el-table-column prop="update_at" label="修改时间" width="200" />

      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button @click="MoreDetailed(scope.row)">详情</el-button>
          <el-button @click="DeleteNotice(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-count="total"
      style="display: flex; justify-content: center; margin-top: 10px"
      v-model:current-page="curPage"
      @current-change="handleChangePage"
    />
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, inject } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const dialog = inject("dialog");
let queryInput = ref("");
let tableData = ref([
  {
    id: "",
    create_at: "",
    update_at: "",
    title: "",
    userName: "",
    categoryName: "",
  },
]);

let total = ref(10);
let curPage = ref(1);
const cate = ref([]);
const user = ref([]);
const message = inject("message");

const getTableData = async (cur = 1) => {
  let res = await axios.get(`/admin/noticeList?pageNum=${cur}&pageSize=${5}`);
  // console.log(res);
  tableData.value = [];
  cate.value = res.data.data.category;
  user.value = res.data.data.userName;
  console.log(cate.value);
  console.log(user.value);
  res.data.data.list.forEach((item, index) => {
    tableData.value.push({
      id: item.id,
      create_at: item.created_at,
      update_at: item.updated_at,
      title: item.title,
      userName: user.value[index],
      categoryName: cate.value[index],
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
    path: "/noticeDetail",
    query: {
      id: row.id,
    },
  });
};

const DeleteNotice = (row) => {
  dialog.warning({
    title: "警告",
    content: "是否要删除",
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: async () => {
      let res = await axios.delete("admin/notice/" + row.id);
      if (res.data.code == 200) {
        message.info(res.data.msg);
      } else {
        message.error(res.data.msg);
      }
      getTableData(1);
    },
    onNegativeClick: () => {},
  });
};

const handleQueryName = async (val) => {
  if (val.length > 0) {
    let res = await axios.get(`/admin/notice/${val}`);
    if (res.data.code == 200) {
      message.success(res.data.msg);
      console.log(res.data.data);
      const item = res.data.data[0];
      tableData.value = [
        {
          id: item.id,
          create_at: item.created_at,
          update_at: item.updated_at,
          title: item.title,
          userName: res.data.userName,
          categoryName: res.data.categoryName,
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
  margin: 20px auto;
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

.svg {
  width: 1850px;
  height: 1440px;
  border: 1px solid steelblue;
  background-image: url(wave.svg);
}
</style>
