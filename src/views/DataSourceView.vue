<template>
  <div class="common-layout">
    <MyHeader/>
    <el-container>
      <el-main>
        <el-row style="margin-bottom: 20px">
          <el-button type="primary">添加数据源</el-button>
          <el-button>导出数据源数据</el-button>
          <el-button type="danger">批量删除数据源</el-button>
        </el-row>
        <div class="searchCondition">
          <el-form :inline="true" :model="searchCondition" class="demo-form-inline">
            <el-form-item label="数据源名称：">
              <el-input v-model="searchCondition.name"/>
            </el-form-item>
            <el-form-item label="主机地址：">
              <el-input v-model="searchCondition.host"/>
            </el-form-item>
            <el-form-item label="数据源类型：">
              <el-select v-model="searchCondition.type" placeholder="数据源类型">
                <el-option label="MySQL" value="0"/>
                <el-option label="Redis" value="1"/>
                <el-option label="MongoDB" value="2"/>
                <el-option label="Oracle" value="3"/>
                <el-option label="Hive" value="4"/>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="load">查询</el-button>
              <el-button type="primary" @click="resetSearch">置空</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="dataSourceTable">
          <el-table border :data="dataSourceTableData" style="width: 100%">
            <el-table-column prop="id" label="ID" width="40"/>
            <el-table-column prop="name" label="数据源名称" width="180"/>
            <el-table-column prop="type" label="类型" width="80">
              <template #default="scope">
                <el-tag type="success" v-if="scope.row.type === 0"><span>MySQL</span></el-tag>
                <el-tag type="warning" v-else-if="scope.row.type === 1">Redis</el-tag>
                <el-tag v-else>其他</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="host" label="主机" width="180"/>
            <el-table-column prop="port" label="端口" width="80"/>
            <el-table-column prop="username" label="数据库用户名" width="130"/>
            <el-table-column prop="createTime" label="创建时间" width="180"/>
            <el-table-column prop="updateTime" label="修改时间" width="180"/>
            <el-table-column prop="deleted" label="是否启用" width="80"/>
            <el-table-column label="操作" width="365">
              <template #default="scope">
                <el-button type="info" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button type="warning" @click="testConnection(scope.$index, scope.row)">连通性测试</el-button>
                <el-button type="success" @click="openMainView(scope.$index, scope.row)">进入</el-button>
                <el-button type="danger" @click="removeDataSource(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

        </div>
      </el-main>
    </el-container>
    <MyFooter/>
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader";
import MyFooter from "@/components/MyFooter";

export default {
  name: 'DataSource',
  components: {MyFooter, MyHeader},
  data() {
    return {
      searchCondition: {},
      dataSourceTableData: []
    }
  },
  created() {
    this.load()
  },
  methods: {
    // 初始化表格、模糊查询、刷新表格
    load() {
      this.$http.get('/api/dataSource', {
            pageNum: 1,
            pageSize: 100,
            name: this.searchCondition.name,
            host: this.searchCondition.host,
            type: this.searchCondition.type,
          }
      ).then(res => {
        this.dataSourceTableData = res.data.dataSourceDTOList
      })
    },
    // 连通性处理
    testConnection(index, row) {
      this.$http.post('api/dataSource/testConnection', row)
          .then(res => {
            if (res.code === 0 && res.data) {
              this.$message.success('该数据源可联通~')
            } else if (!res.data) {
              this.$message.error('连接测试失败，请检查数据源信息和网络情况~')
            }
          })
    },
    // 重置按钮事件处理
    resetSearch() {
      this.searchCondition.name = ''
      this.searchCondition.host = ''
      this.searchCondition.type = ''
      this.load()
    },
    // 删除按钮事件处理
    removeDataSource(index, row) {
      this.$http.delete('api/dataSource/' + row.id)
          .then(res => {
            if (res.code === 0) {
              this.$message.success('已删除~')
              this.load()
            } else {
              this.$message.warning('删除失败~' + res.msg)
            }
          })
    },
    openMainView(index, row) {
      switch (row.type) {
        case 0:
          this.$router.push({
            name: 'MySQL',
            params: {
              dsInfo: row
            }
          })
          break
        case 1:
          break
        case 2:
          break
      }
    }

  }
}

</script>

<style scoped>
.common-layout .el-container {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
}
</style>
