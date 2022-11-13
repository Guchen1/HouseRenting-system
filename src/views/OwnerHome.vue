<template>
  <div style="display: flow-root; height: 100%">
    <h1 style="font-size: 20px; padding-left: 15px">欢迎，{{ store.name }}</h1>
    <h3 style="font-size: 20px; padding-left: 15px; padding-bottom: 30px">
      房主概览：
    </h3>
    <div id="wraper" :style="{ 'min-height': (height - 157) / 1.7 + 'px' }">
      <div class="center" :style="{ 'max-width': (height - 157) / 1.7 + 'px' }">
        <canvas id="myChart" height="100" width="100"></canvas>
      </div>
      <div class="center" :style="{ 'max-width': (height - 157) / 1.7 + 'px' }">
        <canvas id="myChart2" height="100" width="100"></canvas>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useStore } from "../stores/user";
import { Chart, registerables } from "chart.js";
import { onMounted, ref } from "vue";
defineProps(["height"]);
const s = ref(1);
const store = useStore();
Chart.register(...registerables);
onMounted(() => {
  setTimeout(() => {
    s.value = 0;
    const mychart = new Chart(document.getElementById("myChart"), {
      type: "doughnut",
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "房屋出租情况",
            position: "bottom",
          },
          legend: {
            display: true,
            position: "bottom",
          },
        },
      },
      data: {
        labels: ["未出租", "部分出租", "已出租"],
        datasets: [
          {
            label: "My First Dataset",
            data: [5, 2, 1],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
            ],
            hoverOffset: 4,
          },
        ],
      },
    });
    const mychart2 = new Chart(document.getElementById("myChart2"), {
      type: "bar",
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "各房屋租客人数",
            position: "bottom",
          },
          legend: {
            display: false,
          },
        },
      },
      data: {
        labels: ["1号", "2号", "3号"],

        datasets: [
          {
            label: "可租人数",
            data: [10, 5, 3],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
            ],
            hoverOffset: 4,
          },
          {
            label: "已租人数",
            data: [6, 0, 1],
            backgroundColor: [
              "rgb(255, 205, 86)",
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
            ],
            hoverOffset: 4,
          },
        ],
      },
    });
  }, 250);
});
</script>
<style scoped>
.center {
  margin: v-bind(s) auto;
}
#wraper {
  display: grid;
  position: absolute;
  width: 100%;
  grid-template-columns: 50% 50%;
  bottom: 150px;
}
</style>
