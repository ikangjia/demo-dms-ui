<template>
  <el-descriptions style="margin-left: 10px" size="large" title="数据源信息">
    <el-descriptions-item label="数据源名称">{{ dataSourceInfo.name }}</el-descriptions-item>
    <el-descriptions-item label="数据源类型">
      <el-tag v-show="dataSourceInfo.type === 0" size="small">MySQL</el-tag>
      <el-tag v-show="dataSourceInfo.type === 1" type="danger" size="small">Redis</el-tag>
      <el-tag v-show="dataSourceInfo.type === 2" type="success" size="small">MongoDB</el-tag>
      <el-tag v-show="dataSourceInfo.type === 3" type="warning" size="small">Oracle</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="主机">{{ dataSourceInfo.host }}</el-descriptions-item>
    <el-descriptions-item label="端口">{{ dataSourceInfo.port }}</el-descriptions-item>
    <el-descriptions-item label="数据库用户">{{ dataSourceInfo.username }}</el-descriptions-item>
    <el-descriptions-item label="描述">{{ dataSourceInfo.description }}</el-descriptions-item>
  </el-descriptions>
</template>

<script>
export default {
  name: "HelloMysql"
}
</script>

<style scoped>

</style>
