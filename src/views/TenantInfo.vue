<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useAxios } from "../stores/axios";
import { useStore } from "../stores/user";
const emit = defineEmits(["exit"]);
// do not use same name with ref
const store = useStore();
const router = useRouter();
const axios = useAxios();
const form = reactive({
  name: "",
  address: "",
  sex: "",
  phone: "",
  birth: "",
  username: "",
  password: "",
});
const submit = () => {
  if (!store.logged)
    axios.post("/register/tenant", form).then((res) => {
      if (res.data.status == 200) {
        store.centershow = false;
        store.logged = true;
        store.identity = "tenant";
        setTimeout(() => {
          router.push("/tenant");
        }, 100);
        emit("exit");
      }
    });
  else axios.post("/updateinfo/tenant", form);
  console.log(form);
};
</script>

<template>
  <div>
    <el-form
      :model="form"
      style="padding-right: 5%"
      label-width="100px"
      label-position="top"
    >
      <el-form-item label="姓名">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="性别"
        ><el-select v-model="form.sex"
          ><el-option label="男" value="man"></el-option
          ><el-option label="女" value="woman"></el-option></el-select
      ></el-form-item>
      <el-form-item label="联系电话"
        ><el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item label="住址">
        <el-input v-model="form.address" />
      </el-form-item>
      <el-form-item label="出生日期">
        <el-date-picker v-model="form.birth" type="date"></el-date-picker>
      </el-form-item>
      <el-form-item v-if="store.centershow" label="账号">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item v-if="store.centershow" label="密码">
        <el-input v-model="form.password" />
      </el-form-item>
    </el-form>
    <div :class="store.centershow ? 'centerbuttons' : ''">
      <el-button type="primary" @click="submit">提交</el-button
      ><el-button type="danger" v-if="store.centershow" @click="emit('exit')"
        >返回</el-button
      >
    </div>
  </div>
</template>
<style scoped>
.centerbuttons {
  display: flex;
  justify-content: center;
}
</style>
