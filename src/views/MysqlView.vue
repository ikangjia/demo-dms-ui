<template>
  <div class="boss">
    <el-header>
      <h3 style="display:inline;">欢迎使用xxx系统</h3>
      <ul style="display: inline;margin-left: 200px">
        <li><a href="#">SQL 窗口</a></li>
        <li><a href="#">导出数据</a></li>
        <li><a href="#">用户权限操作</a></li>
        <li><a href="#">帮助</a></li>
      </ul>
      <div class="header-loginUser" style="float: right;margin-right: 50px;">
        <span style="color: white;font-size: 14px;line-height: 40px;vertical-align: center">
          当前用户：
           <el-dropdown style="display: inherit;" @command="handleCommand">
              <span style="color: #42b983;line-height: 40px">
                {{ this.loginUser.name }}
                <i class="el-icon-arrow-down el-icon--right" style="font-size: 12px;"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="showLoginUserInfo">用户信息</el-dropdown-item>
                <el-dropdown-item command="logout">注销登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
        </span>
      </div>
    </el-header>
    <div class="container">
      <div class="left-box">
        <div class="left-top">
          数据源信息区域
        </div>
        <div class="left-tree">
          树形菜单区域
        </div>
      </div>
      <div class="right-box">
        各个功能点的标签页区域
      </div>
    </div>
    <el-footer>
      <span>@copyright 2022</span> &nbsp;&nbsp;
      <span>作者：<el-link style="font-size: 14px;" href="https://ikangjia.cn/"
                          target="_blank">林深时觉寒</el-link></span>
    </el-footer>
  </div>
</template>

<script>
export default {
  name: "MysqlView",
  data() {
    return {
      loginUser: {},
      dataSourceInfo: {}
    }
  },
  created() {
    this.initPageData()
  },
  methods: {
    initPageData() {
      this.getUsername()
      const dataSourceId = this.$route.params.dataSourceId
      // const dataSourceType = this.$route.params.dataSourceType

      this.$http.get('api/dataSource/' + dataSourceId)
          .then(res => {
            if (res.code == 0) {
              this.dataSourceInfo = res.data
            }
          })

    },
    // 获取用户名称，显示在 Header 里
    getUsername() {
      this.$http.get('api/user/' + this.getUserIdByToken())
          .then(res => {
            if (res.code === 0) {
              this.loginUser = res.data
            } else {
              this.$message.error('系统错误' + res.msg)
            }
          })
    },
    // 从 token 里获取用户的 id 信息
    getUserIdByToken() {
      let payload = window.atob(localStorage.getItem('token').split('.')[1])
      return JSON.parse(payload).id
    },
    // 右上角用户下拉框事件处理
    handleCommand(command) {
      switch (command) {
        case 'logout':
          localStorage.removeItem('token')
          this.$message.success('注销成功~')
          this.$router.push('/login')
          break
        case 'showLoginUserInfo':
          console.log(this.loginUser)
          break
        default:
          console.log(command)
      }
    }
  }
}
</script>

<style scoped>
.boss {
  height: 100vh;
}

.el-footer {
  text-align: center;
  height: 30px !important;
  width: 100%;
  line-height: 30px;
  font-size: 14px;
  background-color: #42b983;
}

.el-header {
  background-color: black;
  height: 40px !important;
  color: white;
}

.el-header ul li {
  display: inline;
}

.el-header ul li a {
  display: inline;
  color: white;
  text-decoration: none;
  font-size: large;
  line-height: 40px;
  margin-left: 30px;
}

.el-header ul li a:link, .el-header ul li a:visited {
  color: white !important;
}

.el-header ul li a:hover, .el-header ul li a:active {
  color: red !important;
}

.container {
  display: flex;
  height: calc(100% - 70px);
}

.container .left-box {
  flex: 1;
}

.container .left-box .left-top {
  background-color: red;
  height: 100px;
}

.container .left-box .left-tree {
  background-color: gray;
  height: calc(100% - 100px);
}

.container .right-box {
  flex: 3;
  background-color: cyan;
}
</style>
