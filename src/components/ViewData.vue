<template>
  <div>
    <el-table :data="tableData" stripe>
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="address" label="地址" />
      <el-table-column prop="total" label="可租人数" />
      <el-table-column prop="avai" label="已租人数" />
      <el-table-column prop="price" label="价格" />
      <el-table-column label="操作"
        ><template #default="scope">
          <el-button link type="primary" size="small" @click="f(scope)"
            >修改</el-button
          ><el-button link type="danger" size="small">删除</el-button>
        </template></el-table-column
      >
    </el-table>
  </div>
</template>
<script setup>
import { reactive } from "vue";
const f = (x) => {
  console.log(x);
};
const tableData = reactive([
  {
    name: "西电南校区",
    address: "西安市长安区西沣路",
    total: 5000,
    avai: 30,
    price: 1000,
  },
  {
    name: "西电北校区",
    address: "西安市雁塔区太白南路",
    total: 3000,
    avai: 30,
    price: 1500,
  },
]);
</script>
<style scoped></style>
