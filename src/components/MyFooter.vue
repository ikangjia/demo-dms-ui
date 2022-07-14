<template>
  <el-footer>
    <span>@copyright 2022</span> &nbsp;&nbsp;
    <span>作者：<el-link style="font-size: 14px;" href="https://ikangjia.cn/"
                        target="_blank">林深时觉寒</el-link></span>
  </el-footer>
</template>

<script>
export default {
  name: "MyFooter"
}
</script>

<style scoped>
.el-footer {
  text-align: center;
  height: 30px !important;
  width: 100%;
  line-height: 30px;
  font-size: 14px;
  background-color: #42b983;
  position: fixed;
  bottom: 0;
}
</style>
