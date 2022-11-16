<template>
  <div>
    <el-table
      style="min-height: 200px"
      v-loading="loading"
      element-loading-text="加载中"
      :data="tableData.concat(form)"
      stripe
    >
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="address" label="地址" />
      <el-table-column prop="total" label="可租人数" />
      <el-table-column prop="rent" label="已租人数" />
      <el-table-column prop="price" label="价格" />
      <el-table-column label="操作"
        ><template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="
              id = scope.row.id;
              visible = true;
            "
            >修改</el-button
          ><el-button link type="danger" size="small" @click="del(scope.row.id)"
            >删除</el-button
          >
        </template></el-table-column
      >
    </el-table>
    <el-dialog
      v-model="visible"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :destroy-on-close="true"
      class="centerdia"
      ><template #header> <h1 style="margin: 0px">房屋信息修改</h1> </template
      ><AddHouse :id="id" @exit="visible = false"
    /></el-dialog>
  </div>
</template>
<script setup>
//TODO:interface
import { reactive, ref, onMounted } from "vue";
import AddHouse from "@/components/AddHouse.vue";
import { useAxios } from "../stores/axios";
import { ElMessage } from "element-plus";
import { useStore } from "../stores/user.js";
const store = useStore();
const visible = ref(false);
const id = ref("");
const axios = useAxios();
const loading = ref(true);
defineProps(["form"]);
const tableData = reactive([
  {
    id: "1",
    name: "西电南校区",
    address: "西安市长安区西沣路",
    total: 5000,
    rent: 30,
    price: 1000,
  },
  {
    id: "2",
    name: "西电北校区",
    address: "西安市雁塔区太白南路",
    total: 3000,
    rent: 30,
    price: 1500,
  },
]);
const del = (id) => {
  axios
    .post(store.url + "/owner/housedels", { id: id })
    .then((res) => {
      if (res.data.code == 200) {
        for (let item in tableData) {
          if (tableData[item].id == id) {
            tableData.splice(item, 1);
            break;
          }
        }
        ElMessage.success("删除成功");
      } else {
        ElMessage.error("删除失败");
      }
    })
    .catch(() => {
      ElMessage.error("删除失败");
    });
};
onMounted(() => {
  axios
    .get(store.url + "/owner/houseinfo")
    .then((res) => {
      loading.value = false;
      if (res.status == 200) {
        let response = res.data;
        response.forEach((element) => {
          tableData.push(element);
        });
      } else ElMessage.error("获取房屋信息失败");
    })
    .catch(() => {
      loading.value = false;
      ElMessage.error("获取房屋信息失败");
    });
});
</script>
<style scoped>
:deep(.el-dialog__body) {
  padding-top: 10px;
}
:deep(.centerdia) {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  max-width: 800px;
}
</style>
