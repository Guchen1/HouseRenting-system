<template>
  <div id="outer">
    <h1>可租赁列表</h1>
    <el-form :inline="true" style="display: flex; justify-content: center">
      <el-form-item label="关键词搜索"><el-input></el-input></el-form-item>
      <el-form-item label="租金区间"
        ><el-space><el-input></el-input>--<el-input></el-input></el-space
      ></el-form-item>

      <el-form-item label="排序"><el-select></el-select></el-form-item>
      <el-form-item><el-button>应用</el-button></el-form-item>
    </el-form>

    <el-table :data="data" stripe>
      <el-table-column prop="name" label="名称"></el-table-column
      ><el-table-column prop="address" label="地址"></el-table-column
      ><el-table-column prop="price" label="租金"></el-table-column
      ><el-table-column label="操作"></el-table-column
    ></el-table>
  </div>
</template>
<script setup>
import { reactive } from "vue";
const data = reactive([]);
data.push({
  name: "1",
  address: "1",
  price: "1",
});
</script>
<style scoped>
#outer {
  display: flow-root;
  height: 100%;

  padding-left: 15px;
  padding-right: 15px;
}
</style>
