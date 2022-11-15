<template>
  <div id="outer">
    <div style="max-height: 45%">
      <h1>待操作列表</h1>
      <el-table
        style="min-height: 200px"
        element-loading-text="加载中"
        v-loading="loading"
        :data="tableData"
        stripe
      >
        <el-table-column prop="name" label="房屋名称" />
        <el-table-column prop="tenant" label="租户姓名" />
        <el-table-column prop="phone" label="租户电话" />
        <el-table-column label="操作"
          ><template #default="scope">
            <el-button
              link
              type="primary"
              size="small"
              @click="ok(scope, scope.row.id)"
              >已租下</el-button
            ><el-button
              link
              type="danger"
              size="small"
              @click="nook(scope, scope.row.id)"
              >未租下</el-button
            >
          </template></el-table-column
        >
      </el-table>
    </div>
    <div style="max-height: 45%">
      <h1>房屋列表</h1>
      <el-table
        style="min-height: 200px"
        element-loading-text="加载中"
        v-loading="loading"
        row-key="id"
        :data="wholeData"
        stripe
      >
        <el-table-column prop="name" label="房屋名称" />
        <el-table-column prop="tenant" label="租户姓名" />
        <el-table-column prop="phone" label="租户电话" />
        <el-table-column label="操作"
          ><template #default="scope"
            ><el-button
              v-if="scope.row.name == '' || scope.row.name == null"
              type="primary"
              link
              @click="del(scope, scope.row.id)"
              >退租</el-button
            ></template
          ></el-table-column
        >
      </el-table>
    </div>
  </div>
</template>

<style scoped>
#outer {
  height: 100%;
  padding-left: 15px;
  display: flow-root;
  padding-right: 15px;
}
</style>
<script setup>
//TODO:interface
import { reactive, onMounted, ref } from "vue";
import { useAxios } from "../stores/axios.js";
import { useStore } from "../stores/user.js";
import { ElMessage } from "element-plus";
const axios = useAxios();
const store = useStore();
const loading = ref(true);
const ok = (scope, id) => {
  axios
    .post(store.url + "/owner/confirm", { id: id, state: true })
    .then((res) => {
      if (res.status == 200) {
        tableData.splice(scope.$index, 1);
        let i;
        for (i in wholeData) {
          if (scope.row.name == wholeData[i].name) {
            break;
          }
        }
        let temp = JSON.parse(JSON.stringify(scope.row));
        temp.name = undefined;
        wholeData[i].children.push(temp);
        ElMessage.success("操作成功");
      } else {
        ElMessage.error("操作失败");
      }
    })
    .catch(() => {
      ElMessage.error("网络错误");
    });
};
const nook = (scope, id) => {
  axios
    .post(store.url + "/owner/confirm", { id: id, state: false })
    .then((res) => {
      if (res.status == 200) {
        tableData.splice(scope.$index, 1);
        ElMessage.success("操作成功");
      } else {
        ElMessage.error("操作失败");
      }
    })
    .catch(() => {
      ElMessage.error("网络错误");
    });
};
const del = (_scope, id) => {
  let request = { id: id };
  axios
    .post(store.url + "/owner/cancel", request)
    .then((res) => {
      if (res.status == 200) {
        wholeData.forEach((item) => {
          let i;
          for (i in item.children) {
            if (item.children[i].id == id) {
              break;
            }
          }
          item.children.splice(i, 1);
        });
        ElMessage.success("退租成功");
      } else {
        ElMessage.error("退租失败");
      }
    })
    .catch(() => {
      ElMessage.error("退租失败");
    });
};
const tableData = reactive([
  {
    id: "1",
    name: "西电南校区",
    tenant: "陈松泽",
    phone: "12345678901",
  },
]);
const wholeData = reactive([
  {
    name: "西电南校区",
    children: [
      { id: "11", tenant: "魏英豪", phone: "12345678901" },
      { id: "12", tenant: "顾晨", phone: "18796157196" },
    ],
  },
]);
onMounted(() => {
  axios
    .get(store.url + "/owner/opinfo")
    .then((res) => {
      loading.value = false;
      if (res.status == 200) {
        let response = res.data;
        response[0].forEach((element) => {
          tableData.push(element);
        });
        response[1].forEach((element) => {
          wholeData.push(element);
        });
      } else {
        ElMessage.error("获取房屋列表失败");
      }
    })
    .catch(() => {
      loading.value = false;
      ElMessage.error("获取房屋列表失败");
    });
});
</script>
