<template>
  <div id="outer">
    <h1 style="font-size: 20px; padding-bottom: 50px">
      欢迎，{{ store.name }}
    </h1>
    <h1>
      {{ text }}
    </h1>
    <h1 v-if="data.status > 0" style="margin-top: 0px">
      房屋为{{ data.name }},月租为{{ data.price }}元
    </h1>
    <div v-if="data.stat != undefined && data.stat > 0">
      <div v-for="item in data.detail" :key="item.name">{{ detail(item) }}</div>
    </div>
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
import { onMounted, reactive, computed } from "vue";
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
        data.stat = parseInt(response.stat);
        data.detail = response.detail;
      }
    })
    .catch(() => {
      ElMessage.error("网络错误");
    });
});
const text = computed(() => {
  let text = "";

  switch (data == undefined ? 1000 : data.stat) {
    case 0:
      text = "您暂未租住";
      break;
    case 1:
      if (data.detail.length == 1) text = "您有中介费未缴纳";
      break;
    case 2:
      if (data.detail.length == 1) text = "您正在看房";
      break;
    case 3:
      if (data.detail.length == 1) text = "您有房屋已租下";
      break;
    default:
      text = "";
      break;
  }
  return text;
});
const detail = computed(() => {
  return (item) => {
    let text = "";
    console.log(item);
    switch (item.stat) {
      case 1:
        data.detail.length == 1
          ? (text = "房屋为" + item.name + ",租金为" + item.price + "元/月")
          : (text =
              "您有中介费未缴纳，" +
              "房屋为" +
              item.name +
              ",租金为" +
              item.price +
              "元/月");
        break;
      case 2:
        data.detail.length == 1
          ? (text =
              "房屋为" +
              item.name +
              ",房主姓名为" +
              item.owner +
              ",房主电话为" +
              item.phone +
              ",租金为" +
              item.price +
              "元/月")
          : (text =
              "您正在看房，" +
              "房屋为" +
              item.name +
              ",房主姓名为" +
              item.owner +
              ",房主电话为" +
              item.phone +
              ",租金为" +
              item.price +
              "元/月");

        break;
      case 3:
        data.detail.length == 1
          ? (text =
              "房屋为" +
              item.name +
              ",房主姓名为" +
              item.owner +
              ",房主电话为" +
              item.phone +
              ",租金为" +
              item.price +
              "元/月")
          : (text =
              "您有房屋已租下，" +
              "房屋为" +
              item.name +
              ",房主姓名为" +
              item.owner +
              ",房主电话为" +
              item.phone +
              ",租金为" +
              item.price +
              "元/月");

        break;
    }
    return text;
  };
});
</script>
