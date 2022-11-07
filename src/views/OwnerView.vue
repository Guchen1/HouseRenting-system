<script setup>
import { reactive } from "vue";
const emit = defineEmits(["exit"]);
// do not use same name with ref
const form = reactive({
  name: "",
  address: "",
  phone: "",
  username: "",
  password: "",
});
const submit = () => {
  console.log(form);
};
</script>

<template>
  <el-form
    :model="form"
    style="padding-right: 5%"
    label-width="100px"
    label-position="top"
  >
    <el-form-item label="姓名">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="联系电话"
      ><el-input v-model="form.address" />
    </el-form-item>
    <el-form-item label="住址">
      <el-input v-model="form.address" />
    </el-form-item>
    <el-form-item label="账号">
      <el-input v-model="form.username" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="form.password" />
    </el-form-item>
  </el-form>
  <div class="centerbuttons">
    <el-button type="primary" @click="submit">提交</el-button
    ><el-button type="danger" @click="emit('exit')">返回</el-button>
  </div>
</template>
<style scoped>
.centerbuttons {
  display: flex;
  justify-content: center;
}
</style>
