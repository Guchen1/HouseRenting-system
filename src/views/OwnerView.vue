<script setup>
import { reactive } from "vue";

// do not use same name with ref
const form = reactive({
  name: "",
  address: "",
  phone: "",
});
</script>

<template>
  <el-form
    :model="form"
    label-width="120px"
    style="width: 70%; padding-top: 20px"
  >
    <el-form-item label="姓名">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="住址">
      <el-input v-model="form.address" />
    </el-form-item>
    <el-form-item label="联系电话">
      <el-input v-model="form.phone" />
    </el-form-item>
  </el-form>
</template>
<style></style>
