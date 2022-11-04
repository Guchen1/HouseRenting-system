<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div style="height: 100%; width: 100%">
    <el-container style="height: 100%">
      <el-header class="header">
        <div class="center">房屋租赁管理系统</div>
        <el-button type="success" class="right">登录</el-button>
      </el-header>
      <el-container style="height: 100%">
        <el-aside style="height: 100%" width="200px">
          <el-menu default-active="/" style="height: 100%" router>
            <el-menu-item index="/" class="menucenter">
              <el-icon><Edit /></el-icon>
              <span>房主信息登记</span>
            </el-menu-item>
            <el-menu-item index="/about" class="menucenter">
              <el-icon><icon-menu /><Menu /></el-icon>
              <span>房屋信息登记</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main style="height: 100%"><RouterView /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.center {
  line-height: 60px;
  padding-left: 40px;
  display: inline;
}
.header {
  background-color: var(--el-color-primary);
  color: #fff;
  border-bottom: 2px solid rgb(197, 197, 197);
}
.right {
  float: right;
  margin-top: 13px;
  margin-right: 5%;
}
.menucenter {
  justify-content: space-evenly;
}
</style>
