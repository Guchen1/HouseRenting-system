<template>
  <div>
    <el-form label-position="top" style="margin: 0px"
      ><el-row :gutter="30" style="margin-right: 0px" justify="center"
        ><el-col :span="5" :xl="6" :s="4"
          ><el-form-item label="名称"
            ><el-input></el-input
          ></el-form-item> </el-col
        ><el-col :span="5" :xl="6" :s="4"
          ><el-form-item label="地址"
            ><el-input></el-input></el-form-item></el-col
        ><el-col :span="4" :xl="3" :s="6"
          ><el-form-item label="可租"
            ><el-input
              onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57"
              min="0"
              step="1"
              v-model="price"
              type="number"
            ></el-input></el-form-item></el-col
        ><el-col :span="4" :xl="3" :s="6"
          ><el-form-item label="已租"
            ><el-input
              onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57"
              min="0"
              step="1"
              v-model="price"
              type="number"
            ></el-input></el-form-item></el-col
        ><el-col :span="6" :xl="6" :s="4"
          ><el-form-item label="价格"
            ><el-input v-model="price" type="number">
              <template #append>元/月</template></el-input
            >
          </el-form-item></el-col
        ></el-row
      >
      <el-form-item label="房屋简介" style="padding-right: 15px"
        ><el-input
          :autosize="{ minRows: 6, maxRows: 8 }"
          resize="none"
          type="textarea"
        />
      </el-form-item>
    </el-form>
    <el-space
      ><el-button type="primary">提交</el-button
      ><el-button type="danger">清空</el-button></el-space
    >
  </div>
</template>
<script setup>
import { ref } from "vue";
const price = ref(0);
</script>
<style scoped></style>
