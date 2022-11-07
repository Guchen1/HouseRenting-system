<template>
  <div id="top">
    <div class="title">欢迎开始使用本系统</div>
    <div class="buttons">
      <el-space :size="24">
        <el-button size="large" @click="viso = true">我是房主</el-button>
        <el-button size="large" @click="vist = true">我是租客</el-button>
      </el-space>
    </div>
    <el-dialog
      class="centerdia"
      v-model="viso"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      ><template #header><div class="submenu">房主登记</div></template>
      <OwnerView @exit="viso = false"></OwnerView>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref } from "vue";
import OwnerView from "./OwnerView.vue";
const viso = ref(false);
const vist = ref(false);
</script>
<style>
#top {
  height: 100%;
  position: relative;
  z-index: 100;
  display: flex;
  flex-direction: column;
}
.title {
  height: 60%;
  width: 100%;
  display: inline-flex;
  font-size: 60px;
  color: var(--el-color-primary);
  justify-content: center;
  align-items: center;
}
.buttons {
  display: inline-flex;
  justify-content: center;
}
.submenu {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}
.centerdia {
  position: absolute;
  left: 50%;
  top: 50%;
  /* 设置元素的相对于自身的偏移度为负50%(也就是元素自身尺寸的一半)*/
  transform: translate(-50%, -50%);
  margin: 0;
  max-width: 800px;
}
</style>
