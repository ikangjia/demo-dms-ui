<template>
  <el-header>
    <span style="flex: 3">欢迎使用xxx系统</span>
    <div style="flex: 1;">
      <el-link>当前用户: {{ loginUser.name }}</el-link>
    </div>
  </el-header>
</template>

<script>
export default {
  name: "MyHeader",
  data() {
    return {
      loginUser: {}
    }
  },
  created() {
    this.getUsername()
  },
  methods: {
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
    }
  }
}
</script>

<style scoped>
.el-header {
  display: flex;
  align-items: center;
  background-color: #42b983;
  height: 40px !important;
}
</style>
