<template>
  <div id="outer">
    <h1>待缴费列表</h1>
    <el-table v-loading="loading" :data="data">
      <el-table-column prop="name" label="房屋名称" />
      <el-table-column prop="price" label="待缴款" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button link type="primary" @click="pay(scope.row.id)">
            前往支付
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup>
import { reactive, ref, onMounted } from "vue";
import { useAxios } from "../stores/axios.js";
import { useStore } from "../stores/user.js";
import { ElMessage, ElLoading } from "element-plus";
const store = useStore();
const axios = useAxios();
const loading = ref(true);
const data = reactive([
  {
    id: 0,
    name: "西电南校区",
    price: 0,
  },
]);
const pay = (idx) => {
  const loading = ElLoading.service({
    lock: true,
    text: "等待返回支付结果",
  });
  axios
    .post(store.url + "/pay", { id: idx })
    .then((res) => {
      if (res.status == 200) {
        ElMessage.success("支付成功");
        for (let item in data) {
          if (data[item].id == idx) {
            data.splice(item, 1);
            break;
          }
        }
        loading.close();
      }
    })
    .catch(() => {
      ElMessage.error("支付失败");
      loading.close();
    });
};
onMounted(() => {
  axios
    .get(store.url + "/" + store.identity + "/payinfo")
    .then((res) => {
      if (res.status == 200) {
        let response = res.data;
        response.forEach((item) => {
          data.push(item);
        });
        loading.value = false;
      }
    })
    .catch(() => {
      ElMessage.error("获取数据失败");
      loading.value = false;
    });
});
</script>
<style scoped>
#outer {
  height: 100%;
  padding-left: 15px;
  display: flow-root;
  padding-right: 15px;
}
</style>
