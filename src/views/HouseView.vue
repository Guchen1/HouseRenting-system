<template>
  <div style="height: 100%; padding-left: 15px; display: flow-root">
    <h1>房屋添加</h1>
    <AddHouse />
    <h1>已添加房屋列表</h1>
    <ViewData style="padding-right: 15px" />
  </div>
</template>

<style></style>
<script setup>
import ViewData from "@/components/ViewData.vue";
import AddHouse from "../components/AddHouse.vue";
</script>
