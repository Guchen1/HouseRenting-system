<template>
  <div id="outer">
    <h1>可租赁列表</h1>
    <el-form
      :model="tempfilter"
      :inline="true"
      style="display: flex; justify-content: center"
    >
      <el-form-item label="关键词搜索"
        ><el-input v-model="tempfilter.keyword"></el-input
      ></el-form-item>
      <el-form-item label="租金区间"
        ><el-space
          ><el-input
            type="number"
            @change="
              () => {
                tempfilter.price.min =
                  !isNaN(tempfilter.price.min) || !tempfilter.price.min == ''
                    ? parseFloat(tempfilter.price.min)
                    : NaN;
              }
            "
            v-model="tempfilter.price.min"
          ></el-input
          >-<el-input
            type="number"
            @change="
              () => {
                tempfilter.price.max =
                  !isNaN(tempfilter.price.max) || !tempfilter.price.max == ''
                    ? parseFloat(tempfilter.price.max)
                    : NaN;
              }
            "
            v-model="tempfilter.price.max"
          ></el-input></el-space
      ></el-form-item>
      <el-form-item><el-button @click="apply">应用</el-button></el-form-item>
      <el-form-item><el-button @click="reset">重置</el-button></el-form-item>
    </el-form>

    <el-table :data="datafiltered" stripe>
      <el-table-column prop="name" label="名称"></el-table-column
      ><el-table-column prop="address" label="地址"></el-table-column
      ><el-table-column prop="price" label="租金"></el-table-column
      ><el-table-column label="简介"></el-table-column
      ><el-table-column label="操作"
        ><template #default="scope"
          ><el-button
            link
            type="primary"
            :disabled="scope.row.running"
            @click="submit(scope)"
            >申请看房</el-button
          ></template
        ></el-table-column
      ></el-table
    >
  </div>
</template>
<script setup>
import { reactive, computed, onMounted } from "vue";
import { useAxios } from "../stores/axios.js";
import { useStore } from "../stores/user.js";
import { ElMessage } from "element-plus";
const store = useStore();
const axios = useAxios();
const data = reactive([]);
const tempfilter = reactive({
  keyword: "",
  price: {
    min: NaN,
    max: NaN,
  },
});
const filter = reactive({
  keyword: "",
  price: {
    min: NaN,
    max: NaN,
  },
});
onMounted(async () => {
  try {
    const res = await axios.get(store.url + "/tenant/house");
    if (res.status == 200 && !res.data.isSuccess) {
      data.push(...res.data);
    } else {
      ElMessage.error("获取房屋列表失败");
    }
  } catch (e) {
    ElMessage.error("获取房屋列表失败");
  }
});
data.push({
  id: 1,
  name: "1",
  address: "1",
  price: "200",
  running: false,
  description: "",
});
data.push({
  id: 2,
  name: "12",
  address: "1",
  price: "100",
  running: false,
  description: "",
});
const apply = () => {
  filter.keyword = tempfilter.keyword;
  filter.price.min = tempfilter.price.min;
  filter.price.max = tempfilter.price.max;
};
const reset = () => {
  tempfilter.keyword = "";
  tempfilter.price.min = NaN;
  tempfilter.price.max = NaN;
  apply();
};
const submit = (scope) => {
  axios
    .post(store.url + "/tenant/request", {
      id: scope.row.id,
    })
    .then((res) => {
      if (res.status == 200 && res.data.isSuccess != false) {
        ElMessage.success("申请成功");
        scope.row.running = true;
      } else {
        ElMessage.error("申请失败");
      }
    })
    .catch(() => {
      ElMessage.error("申请失败");
    });
};

const datafiltered = computed(() => {
  return data.filter((item) => {
    return (
      (item.name.includes(filter.keyword) ||
        item.address.includes(filter.keyword)) &&
      (isNaN(filter.price.min) || item.price >= filter.price.min) &&
      (isNaN(filter.price.max) || item.price <= filter.price.max)
    );
  });
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
