<template>
  <div class="boss" @click="optionCardClose">
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
      <!-- 左侧区域 -->
      <div class="left-box">
        <!-- 模糊匹配搜索框 -->
        <div class="left-top">
          <el-input v-model="filterText" placeholder="输入关键字进行过滤" style="margin-right: 15px;width: 280px"></el-input>
          <el-button style="" size="mini" @click="resetLikeSearch">置空</el-button>
        </div>

        <!-- 树形菜单区域 -->
        <div class="left-tree">
          <el-tree
              id="el-tree"
              class="disableSelect"
              :data="treeData"
              node-key="id"
              :empty-text="emptyText"
              :filter-node-method="filterNode"
              @node-contextmenu="rightClick"
              @node-click="leftClick"
              :highlight-current="true"
              ref="tree">
             <span slot-scope="{ node, data }" class="slot-t-node">
               <template>
                 <i :class="data.icon" style="color: wheat;margin-right: 2px"/>
                 <span>{{ node.label }}</span>
               </template>
             </span>
          </el-tree>
          <!-- 右键数据库 -->
          <div :style="{left: rightClickData.optionCardX + 'px',top: rightClickData.optionCardY + 'px'}"
               v-show="rightClickData.databaseCardShow"
               class="rightClickMenu disableSelect"
               id="rightClickMenu1">
            <a href="javascript:">新建数据库</a>
            <a href="javascript:">编辑数据库</a>
            <a href="javascript:">删除数据库</a>
            <el-divider></el-divider>
            <a href="javascript:">新建表</a>
            <a href="javascript:">新建视图</a>
            <a href="javascript:">新建存储过程</a>
            <a href="javascript:">新建函数</a>
          </div>
          <!-- 右键表 -->
          <div :style="{left: rightClickData.optionCardX + 'px',top: rightClickData.optionCardY + 'px'}"
               v-show="rightClickData.tableCardShow"
               class="rightClickMenu"
               id="rightClickMenu2">
            <a href="javascript:">创建表</a>
            <a href="javascript:">导出表数据</a>
            <el-divider></el-divider>
            <a href="javascript:">新建视图</a>
            <a href="javascript:">新建存储过程</a>
            <a href="javascript:">新建函数</a>
          </div>
          <!-- 右键某一张表 -->
          <div :style="{left: rightClickData.optionCardX + 'px',top: rightClickData.optionCardY + 'px'}"
               v-show="rightClickData.table1CardShow"
               class="rightClickMenu"
               id="rightClickMenu3">
            <a href="javascript:">打开表</a>
            <a href="javascript:">创建表</a>
            <a href="javascript:">修改表</a>
            <a href="javascript:">清空表数据</a>
            <a href="javascript:">截断表</a>
            <a href="javascript:">删除表</a>
            <a href="javascript:">导出表数据</a>
            <el-divider></el-divider>
            <a href="javascript:">新建视图</a>
            <a href="javascript:">新建存储过程</a>
            <a href="javascript:">新建函数</a>
          </div>
          <!-- 右键视图 -->
          <div :style="{left: rightClickData.optionCardX + 'px',top: rightClickData.optionCardY + 'px'}"
               v-show="rightClickData.viewCardShow"
               class="rightClickMenu"
               id="rightClickMenu4">
            <a href="javascript:">创建视图</a>
            <a href="javascript:">导出视图数据</a>
            <a href="javascript:">刷新</a>
          </div>
          <!-- 右键某一视图 -->
          <div :style="{left: rightClickData.optionCardX + 'px',top: rightClickData.optionCardY + 'px'}"
               v-show="rightClickData.view1CardShow"
               class="rightClickMenu"
               id="rightClickMenu5">
            <a href="javascript:">打开视图</a>
            <a href="javascript:">创建视图</a>
            <a href="javascript:">修改视图</a>
            <a href="javascript:">删除视图</a>
            <a href="javascript:">导出视图数据</a>
          </div>
          <!-- 右键存储过程 -->
          <div :style="{left: rightClickData.optionCardX + 'px',top: rightClickData.optionCardY + 'px'}"
               v-show="rightClickData.procedureCardShow"
               class="rightClickMenu"
               id="rightClickMenu6">
            <a href="javascript:">创建存储过程</a>
            <a href="javascript:">刷新</a>
          </div>
          <!-- 右键某一存储过程 -->
          <div :style="{left: rightClickData.optionCardX + 'px',top: rightClickData.optionCardY + 'px'}"
               v-show="rightClickData.procedure1CardShow"
               class="rightClickMenu"
               id="rightClickMenu7">
            <a href="javascript:">打开存储过程</a>
            <a href="javascript:">创建存储过程</a>
            <a href="javascript:">删除存储过程</a>
          </div>
          <!-- 右键函数 -->
          <div :style="{left: rightClickData.optionCardX + 'px',top: rightClickData.optionCardY + 'px'}"
               v-show="rightClickData.functionCardShow"
               class="rightClickMenu"
               id="rightClickMenu8">
            <a href="javascript:">创建函数</a>
          </div>
          <!-- 右键某一函数 -->
          <div :style="{left: rightClickData.optionCardX + 'px',top: rightClickData.optionCardY + 'px'}"
               v-show="rightClickData.function1CardShow"
               class="rightClickMenu"
               id="rightClickMenu9">
            <a href="javascript:">打开函数</a>
            <a href="javascript:">创建函数</a>
            <a href="javascript:">修改函数</a>
            <a href="javascript:">删除函数</a>
          </div>
        </div>

      </div>
      <!-- 右侧标签主体区域 -->
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
import treeData from '../mokedata/mysql_data'

export default {
  name: "MysqlView",
  data() {
    return {
      loginUser: {},
      dataSourceInfo: {},
      treeData: treeData,
      emptyText: '无数据~',
      filterText: '',

      // 右键菜单相关变量
      rightClickData: {
        optionCardX: '',
        optionCardY: '',
        databaseCardShow: false,  // 右键数据库
        tableCardShow: false,  // 右键表
        table1CardShow: false,  // 右键某张表
        viewCardShow: false,  // 右键视图
        view1CardShow: false,  // 右键某张视图
        procedureCardShow: false,  // 右键存储过程
        procedure1CardShow: false,  // 右键某一存储过程
        functionCardShow: false,  // 右键函数
        function1CardShow: false,  // 右键某一函数
        optionData: [],
        node: null,
        tree: null
      }
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
    },
    // 模糊搜索置空
    resetLikeSearch() {
      this.filterText = ''
    },
    // 模糊筛选
    filterNode(value, data, node) {
      console.log(node.isLeaf)
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },

    // 单击树事件
    leftClick() {
      this.closeAllRightClick()
    },
    // 关闭所有右键菜单
    closeAllRightClick() {
      this.rightClickData.databaseCardShow = false
      this.rightClickData.tableCardShow = false
      this.rightClickData.table1CardShow = false
      this.rightClickData.viewCardShow = false
      this.rightClickData.view1CardShow = false
      this.rightClickData.procedure1CardShow = false
      this.rightClickData.procedureCardShow = false
      this.rightClickData.function1CardShow = false
      this.rightClickData.functionCardShow = false
    },
    // 右键树事件
    // 参数依次为：event、节点数据对象、节点对应的 Node、节点组件本身
    rightClick(event, data, node, target) {
      this.closeAllRightClick()

      this.rightClickData.optionCardX = event.x + 10
      this.rightClickData.optionCardY = event.y
      this.rightClickData.optionData = data
      this.rightClickData.node = node // 将当前节点保存
      this.rightClickData.tree = target

      // 获取当前右键的树菜单类型
      const nodeId = this.rightClickData.optionData.id

      switch (nodeId.slice(0, 3)) {
        case '1-d':
          // 右键数据库
          this.rightClickData.databaseCardShow = true
          break
        case '2-t':
          // 右键表
          this.rightClickData.tableCardShow = true
          break
        case '3-t':
          // 右键某一张表
          this.rightClickData.table1CardShow = true
          break
        case '2-v':
          // 右键视图
          this.rightClickData.viewCardShow = true
          break
        case '3-v':
          // 右键某一视图
          this.rightClickData.view1CardShow = true
          break
        case '2-p':
          // 右键存储过程
          this.rightClickData.procedureCardShow = true
          break
        case '3-p':
          // 右键某一存储过程
          this.rightClickData.procedure1CardShow = true
          break
        case '2-f':
          // 右键函数
          this.rightClickData.functionCardShow = true
          break
        case '3-f':
          // 右键某一函数
          this.rightClickData.function1CardShow = true
          break
      }
    },
    // 点击其他区域右键菜单关闭
    optionCardClose(event) {
      for (let i = 1; i < 10; i++) {
        let currentCli = document.getElementById("rightClickMenu" + i);
        if (currentCli) {
          if (!currentCli.contains(event.target)) { //点击到了id为 rightClickMenu 以外的区域，就隐藏菜单
            this.closeAllRightClick()
          }
        }
      }
    },

  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
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
  height: 40px;
  margin: 5px auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container .left-box .left-tree {
  height: calc(100% - 40px);
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
}

.disableSelect {
  user-select: none;
}

.rightClickMenu {
  text-align: center;
  border-radius: 2px;
  font-size: 12px;
  z-index: 9999;
  position: fixed;
  width: 120px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

.rightClickMenu a {
  text-decoration: none;
  color: black;
  display: block;
  padding: 5px;
}

.rightClickMenu a:hover {
  background-color: #364f5e;
  color: white;
  font-weight: bold;
}

.el-divider--horizontal {
  margin: 5px 10px;
  width: auto;
}

/*右侧标签区域样式*/
.container .right-box {
  flex: 3;
  background-color: cyan;
}
</style>
