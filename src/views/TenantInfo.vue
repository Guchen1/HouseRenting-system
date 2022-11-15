<script setup>
import { reactive, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useAxios } from "../stores/axios";
import { useStore } from "../stores/user";
import { ElMessage } from "element-plus";
const emit = defineEmits(["exit", "registered"]);
// do not use same name with ref
const store = useStore();
const router = useRouter();
const loading = ref(true);
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
    axios.post(store.url + "/register/tenant", form).then((res) => {
      if (res.status == 200) {
        setTimeout(() => {
          emit("registered", form.username, form.password);
        }, 100);
        ElMessage.success("注册成功");
        emit("exit");
      }
    });
  else
    axios.post(store.url + "/tenant/update", form).then((res) => {
      if (res.status == 200) {
        ElMessage.success("修改成功");
      }
    });
  console.log(form);
};
onMounted(() => {
  if (store.logged) {
    axios
      .get(store.url + "/tenant/info")
      .then((res) => {
        loading.value = false;
        if (res.status == 200) {
          let response = JSON.parse(res.data);
          form.name = response.name;
          form.address = response.address;
          form.phone = response.phone;
          form.birth = response.birth;
          form.sex = response.sex;
        }
      })
      .catch((err) => {
        loading.value = false;
        ElMessage.error(err);
      });
  }
});
</script>

<template>
  <div
    v-loading="$route.path == '/tenant/info' ? loading : false"
    element-loading-text="加载中"
    :class="$route.path == '/tenant/info' ? 'logged' : ''"
  >
    <el-form
      :model="form"
      style="padding-right: 5%"
      label-width="100px"
      label-position="top"
    >
      <el-row :gutter="20" justify="center"
        ><el-col :span="8"
          ><el-form-item label="姓名">
            <el-input v-model="form.name" /> </el-form-item></el-col
        ><el-col :span="8">
          <el-form-item label="性别"
            ><el-select v-model="form.sex"
              ><el-option label="男" value="True"></el-option
              ><el-option
                label="女"
                value="False"
              ></el-option></el-select></el-form-item></el-col
        ><el-col :span="8">
          <el-form-item label="出生日期">
            <el-date-picker
              v-model="form.birth"
              type="date"
            ></el-date-picker> </el-form-item></el-col
      ></el-row>

      <el-form-item label="联系电话"
        ><el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item label="住址">
        <el-input v-model="form.address" />
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
.logged {
  padding-left: 15px;
  padding-top: 20px;
}
</style>
