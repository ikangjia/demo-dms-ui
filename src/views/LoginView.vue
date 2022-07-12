<template>
  <div class="main">
    <div class="loginBox">
      <span>欢迎使用本系统</span>

      <el-form id="loginForm">
        <el-form-item>
          <el-input v-model="loginForm.account" placeholder="Username"/>
        </el-form-item>
        <el-form-item>
          <el-input v-model="loginForm.password" type="password" placeholder="Password" show-password/>
        </el-form-item>
        <el-form-item>
          <el-input style="width: 40%;margin-left:0; margin-right: 20px" v-model="loginForm.code"
                    placeholder="验证码"/>
          <img style="width: 60%" src="" alt="aaa">
        </el-form-item>
        <el-button type="primary" style="width: 100%; margin-bottom: 10px" @click="doLogin">登录</el-button>
        <el-link href="#" style="float: left">忘记密码？</el-link>
        <el-link href="#" style="float: right" type="primary">新账户注册</el-link>
      </el-form>

    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data () {
    return {
      loginForm: {
        account: 'admin',
        password: 'admin',
        code: '1234'
      }
    }
  },
  methods: {
    doLogin () {
      this.$router.push('/dataSource')
    }
  }
}
</script>

<style scoped>
.main {
  background-image: linear-gradient(to right bottom, red, violet);
  display: flex;
  height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
}

.loginBox {
  width: 400px;
  height: 450px;
  background-color: white;
  border-radius: 15px;
}

span, #loginForm{
  width: 80%;
  margin-left: 10%;
  margin-bottom: 10px;
}

span {
  display: block;
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 30px;
  text-align: center;
}

</style>
