<template>
  <div id="outer">
    <h1>可租赁列表</h1>
    <el-table
      ><el-table-column label="名称"></el-table-column
      ><el-table-column label="地址"></el-table-column
      ><el-table-column label="租金"></el-table-column
    ></el-table>
  </div>
</template>

<style scoped>
#outer {
  display: flow-root;
  height: 100%;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
}
</style>
