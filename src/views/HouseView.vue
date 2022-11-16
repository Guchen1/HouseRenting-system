<template>
  <div style="height: 100%; padding-left: 15px; display: flow-root">
    <h1>房屋添加</h1>
    <AddHouse
      @add="
        (x) => {
          form.id = x.id;
          form.name = x.name;
          form.address = x.address;
          form.price = x.price;
          form.total = x.total;
          form.rent = x.rent;
          form.description = x.description;
        }
      "
    />
    <h1>已添加房屋列表</h1>
    <ViewData :form="form" style="padding-right: 15px" />
  </div>
</template>

<style></style>
<script setup>
import { reactive } from "vue";
import ViewData from "@/components/ViewData.vue";
import AddHouse from "../components/AddHouse.vue";
const form = reactive({});
</script>
