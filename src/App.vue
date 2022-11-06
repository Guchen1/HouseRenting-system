<script setup>
import { RouterView, useRouter, useRoute } from "vue-router";
import { ref, onMounted } from "vue";
const identity = ref("tenant");
const router = useRouter();
const route = useRoute();
onMounted(() => {
  if (identity.value === "owner") {
    router.push("/owner");
  } else if (identity.value === "tenant") {
    router.push("/tenant");
  }
});
</script>

<template>
  <div style="height: 100%; width: 100%">
    <el-container style="height: 100%">
      <el-header class="header">
        <div class="center">房屋租赁管理系统</div>
        <el-button type="success" class="right">登录</el-button>
      </el-header>
      <el-container style="height: 100%">
        <el-aside style="height: 100%" width="200px" v-if="route.path != '/'">
          <el-menu :default-active="route.path" style="height: 100%" router>
            <el-menu-item
              index="/owner"
              v-if="identity == 'owner'"
              class="menucenter"
            >
              <el-icon><Edit /></el-icon>
              <span>信息修改</span>
            </el-menu-item>
            <el-menu-item
              index="/house"
              v-if="identity == 'owner'"
              class="menucenter"
            >
              <el-icon><Menu /></el-icon>
              <span>房屋信息登记</span>
            </el-menu-item>
            <el-menu-item
              index="/tenant"
              v-if="identity == 'tenant'"
              class="menucenter"
            >
              <el-icon><Menu /></el-icon>
              <span>信息登记</span>
            </el-menu-item>
            <el-menu-item
              index="/rent"
              v-if="identity == 'tenant'"
              class="menucenter"
            >
              <el-icon><Menu /></el-icon>
              <span>房屋租赁</span>
            </el-menu-item>
            <el-menu-item
              index="/state"
              v-if="identity == 'owner'"
              class="menucenter"
            >
              <el-icon><Menu /></el-icon>
              <span>房屋状态变更</span>
            </el-menu-item>
            <el-menu-item
              index="/charge"
              v-if="identity == 'owner'"
              class="menucenter"
            >
              <el-icon><Menu /></el-icon>
              <span>手续费缴纳</span>
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

  user-select: none;
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

span {
  user-select: none;
  width: 100%;
  justify-content: center;
  display: flex;
}
</style>
