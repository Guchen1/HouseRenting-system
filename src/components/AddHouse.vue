<template>
  <div>
    <el-form label-position="top" style="margin: 0px" :model="form">
      <el-row :gutter="30" style="margin-right: 0px" justify="center"
        ><el-col :span="5" :xl="6" :s="4"
          ><el-form-item label="名称"
            ><el-input v-model="form.name"></el-input
          ></el-form-item> </el-col
        ><el-col :span="5" :xl="6" :s="4"
          ><el-form-item label="地址" v-model="form.address"
            ><el-input v-model="form.address"></el-input></el-form-item></el-col
        ><el-col :span="4" :xl="3" :s="6"
          ><el-form-item label="可租"
            ><el-input
              onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57"
              @change="
                () => {
                  form.total = parseInt(form.total);
                }
              "
              min="0"
              step="1"
              v-model="form.total"
              type="number"
            ></el-input></el-form-item></el-col
        ><el-col :span="4" :xl="3" :s="6"
          ><el-form-item label="已租"
            ><el-input
              onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57"
              min="0"
              step="1"
              v-model="form.rent"
              @change="
                () => {
                  form.rent = parseInt(form.rent);
                }
              "
              type="number"
            ></el-input></el-form-item></el-col
        ><el-col :span="6" :xl="6" :s="4"
          ><el-form-item label="价格"
            ><el-input
              v-model="form.price"
              @change="
                () => {
                  form.price = parseFloat(form.price);
                }
              "
              type="number"
            >
              <template #append>元/月</template></el-input
            >
          </el-form-item></el-col
        ></el-row
      >
      <el-form-item label="房屋简介" style="padding-right: 15px"
        ><el-input
          :autosize="{ minRows: 6, maxRows: 8 }"
          v-model="form.description"
          resize="none"
          type="textarea"
        />
      </el-form-item>
    </el-form>
    <el-space
      ><el-button type="primary" @click="submit">提交</el-button
      ><el-button
        type="danger"
        @click="id == undefined ? clear() : emit('exit')"
        >{{ id == undefined ? "清空" : "返回" }}</el-button
      ></el-space
    >
  </div>
</template>
<script setup>
//TODO:interface
import { reactive, onMounted } from "vue";
import { useAxios } from "@/stores/axios.js";
import { useStore } from "@/stores/user.js";
import { ElMessage } from "element-plus";
const axios = useAxios();
const store = useStore();
const emit = defineEmits(["exit", "add"]);
const props = defineProps(["id"]);
const form = reactive({
  name: "",
  address: "",
  total: 0,
  rent: 0,
  price: 0,
  description: "",
});
const clear = () => {
  form.name = "";
  form.address = "";
  form.total = 0;
  form.rent = 0;
  form.price = 0;
  form.description = "";
};
const submit = () => {
  if (props.id == undefined) {
    if (
      form.name == "" ||
      form.address == "" ||
      form.total == 0 ||
      form.price == 0 ||
      form.description == ""
    ) {
      ElMessage.error("请填写完整信息");
      return;
    } else if (form.rent > form.total) {
      ElMessage.error("已租数量不能大于可租数量");
      return;
    }
    axios
      .post(store.url + "/owner/houseinfo?op=1", form)
      .then((res) => {
        if (res.status == 200 && res.data.isSuccess) {
          form.id = res.data.id;
          emit("add", JSON.parse(JSON.stringify(form)));
          form.name = "";
          form.address = "";
          form.total = 0;
          form.rent = 0;
          form.price = 0;
          form.description = "";
          ElMessage.success("添加成功");
        } else throw "失败";
      })
      .catch(() => {
        ElMessage.error("添加失败");
      });
  } else {
    form.id = props.id;
    axios
      .post(store.url + "/owner/houseinfo?op=2", form)
      .then((res) => {
        if (res.status == 200) {
          emit("exit");
          ElMessage.success("修改成功");
        }
      })
      .catch(() => {
        ElMessage.error("修改失败");
      });
  }
};

onMounted(() => {
  if (props.id != undefined) {
    axios
      .get(store.url + "/owner/houseinfo?id=" + props.id)
      .then((res) => {
        if (res.status == 200) {
          let response = res.data[0];
          form.name = response.name;
          form.address = response.address;
          form.total = response.total;
          form.rent = response.rent;
          form.price = response.price;
          form.description = response.description;
        }
      })
      .catch(() => {
        ElMessage.error("获取房屋信息失败");
      });
  }
});
</script>
<style scoped></style>
