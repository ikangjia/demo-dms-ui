<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <span style="flex: 3">欢迎使用xxx系统</span>
        <div style="flex: 1;">
          <el-link>当前用户: {{ loginUser.name }}</el-link>
        </div>
      </el-header>
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
                <el-button type="info" @click="handleEdit(scope.$index, scope.row)"
                >编辑
                </el-button
                >
                <el-button type="warning" @click="testConnection(scope.$index, scope.row)"
                >连通性测试
                </el-button
                >
                <el-button type="success" @click="testConnection(scope.$index, scope.row)"
                >进入
                </el-button
                >
                <el-button
                    type="danger"
                    @click="removeDataSource(scope.$index, scope.row)"
                >删除
                </el-button
                >
              </template>
            </el-table-column>
          </el-table>

        </div>
      </el-main>
      <el-footer>
        <span>@copyright 2022</span> &nbsp;&nbsp;
        <span>作者：<el-link style="font-size: 14px;" href="https://ikangjia.cn/"
                            target="_blank">林深时觉寒</el-link></span>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'DataSource',
  data() {
    return {
      loginUser: {},
      searchCondition: {},
      dataSourceTableData: [
        // {
        //   id: 1,
        //   name: 'local-mysql',
        //   type: 0,
        //   host: 'localhost',
        //   port: '3306',
        //   username: 'root',
        //   createTime: 'aaa',
        //   updateTime: 'aaa',
        //   deleted: false
        // }
      ]
    }
  },
  created() {
    this.load()
    this.getUsername()
  },
  methods: {
    // 初始化表格、模糊查询、刷新表格
    load() {
      this.$axios.get('http://localhost:9002/dataSource', {
        params: {
          pageNum: 1,
          pageSize: 100,
          name: this.searchCondition.name,
          host: this.searchCondition.host,
          type: this.searchCondition.type,
        },
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then(res => {
        this.dataSourceTableData = res.data.data.dataSourceDTOList
      })
    },
    // 连通性处理
    testConnection(index, row) {
      this.$axios.post('http://localhost:9002/dataSource/testConnection', row, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then(res => {
        if (res.data.code === 0 && res.data.data) {
          this.$message.success('该数据源可联通~')
        } else {
          this.$message.error(res.data.msg)
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
      this.$axios.delete('http://localhost:9002/dataSource/' + row.id, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then(res => {
        if (res.data.code === 0) {
          this.$message.success('已删除~')
          this.load()
        } else {
          this.$message.warning('删除失败~' + res.data.msg)
        }
      })
    },

    // 获取用户名称，显示在 Header 里
    getUsername() {
      const _this = this
      const userId = this.getUserIdByToken()
      this.$axios.get('http://localhost:9002/user/' + userId, {
            headers: {
              Authorization: localStorage.getItem('token')
            }
          }
      ).then(res => {
        if (res.data.code === 0) {
          _this.loginUser = res.data.data
        } else {
          _this.$message.error('系统错误' + res.data.msg)
        }
      })
    },
    // 从 token 里获取用户的 id 信息
    getUserIdByToken() {
      let payload = window.atob(localStorage.getItem('token').split('.')[1])
      return JSON.parse(payload).id
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

.common-layout .el-container .el-header {
  display: flex;
  align-items: center;
  background-color: #42b983;
}

.common-layout .el-container .el-main {
}

.common-layout .el-container .el-footer {
  text-align: center;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  background-color: #42b983;
}

.searchCondition {

}

.dataSourceTable {

}
</style>
