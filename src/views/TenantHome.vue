<template>
  <div id="outer">
    <h1 style="font-size: 20px; padding-bottom: 50px">
      欢迎，{{ store.name }}
    </h1>
    <h1>
      {{
        data.status == 0 || data.status == undefined
          ? "您暂未租住"
          : "您正在" + (data.status == 1 ? "租住" : "看房")
      }}
    </h1>
    <h1 v-if="data.status > 0" style="margin-top: 0px">
      房屋为{{ data.name }},月租为{{ data.price }}元
    </h1>
  </div>
</template>

<style scoped>
#outer {
  display: flow-root;
  height: 100%;

  padding-left: 15px;
}
</style>
<script setup>
import { useStore } from "../stores/user.js";
import { useAxios } from "../stores/axios.js";
import { onMounted, reactive } from "vue";
import { ElMessage } from "element-plus";
const axios = useAxios();
const store = useStore();
const data = reactive({});
onMounted(() => {
  axios
    .get(store.url + "/tenant/statistics")
    .then((res) => {
      if (res.status == 200) {
        let response = res.data;
        data.status = parseInt(response.status);
        data.name = response.name;
        data.price = response.price;
      }
    })
    .catch(() => {
      ElMessage.error("网络错误");
    });
});
</script>
