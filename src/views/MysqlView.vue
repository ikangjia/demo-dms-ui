<template>
  <div class="boss" @click="optionCardClose">
    <el-header>
      <h3 style="display:inline;">欢迎使用xxx系统</h3>
      <ul style="display: inline;margin-left: 200px">
        <li><a href="javascript:" @click="createTab(1)">SQL 窗口</a></li>
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
          <el-input v-model="filterText" placeholder="输入关键字进行过滤" style="margin-right: 5px;width: 70%"></el-input>
          <el-button style="width: 20%" size="mini" @click="resetLikeSearch">置空</el-button>
        </div>

        <!-- 树形菜单区域 -->
        <div class="left-tree">
          <el-tree
              id="el-tree"
              class="disableSelect"
              node-key="id"
              :props="treeProps"
              :empty-text="emptyText"
              :filter-node-method="filterNode"
              @node-contextmenu="rightClick"
              @node-click="leftClick"
              :highlight-current="true"
              :load="loadTree"
              lazy
              ref="tree">
             <span slot-scope="{ node, data }" class="slot-t-node">
               <template>
                 <i :class="data.icon" style="color: wheat;margin-right: 5px"/>
                 <span>{{ node.label }}</span>
               </template>
             </span>
          </el-tree>

          <!-- 右键数据库 -->
          <div :style="{left: rightClickData.optionCardX + 'px',top: rightClickData.optionCardY + 'px'}"
               v-show="rightClickData.databaseCardShow"
               class="rightClickMenu disableSelect"
               id="rightClickMenu1">
            <a href="javascript:" @click="openCreateDbDialog">新建数据库</a>
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

        <!-- 新建数据库对话框 -->
        <el-dialog title="新建数据库" :visible.sync="dialogCreateDbVisible">
          <el-form :model="databaseForm">
            <el-form-item label="数据库名" label-width="200px">
              <el-input v-model="databaseForm.dbName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="字符集" label-width="200px">
              <el-select @change="initCollations()" v-model="databaseForm.characterSetName" placeholder="请选择字符集">
                <el-option
                    v-for="item in characterSetNameList"
                    :key="item"
                    :label="item"
                    :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="排序规则" label-width="200px">
              <el-select v-model="databaseForm.collationName" placeholder="请选择排序规则">
                <el-option
                    v-for="item in collationNames"
                    :key="item"
                    :label="item"
                    :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogCreateDbVisible = false">取 消</el-button>
            <el-button type="primary" @click="createDb">确 定</el-button>
          </div>
        </el-dialog>


      </div>
      <!-- 右侧标签主体区域 -->
      <div class="right-box">
        <el-tabs type="card">
          <el-tab-pane
              label="首页"
              :closable="false">
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
          </el-tab-pane>
          <el-tab-pane label="创建表" :closable="true">
            <MysqlConsole></MysqlConsole>
          </el-tab-pane>
        </el-tabs>
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
import MysqlConsole from "@/components/mysql/MysqlConsole";

export default {
  name: "MysqlView",
  components: {MysqlConsole},
  data() {
    return {
      loginUser: {},
      dataSourceInfo: {},

      treeData: [],
      treeProps: {
        label: 'label',
        isLeaf: 'leaf',
        icon: 'icon',
        id: 'id'
      },
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
      },

      // 创建数据库对话框
      dialogCreateDbVisible: false,
      databaseForm: {},
      characterSetNameList: [],
      collationNames: [],
    }
  },
  created() {
    this.initPageData()
  },
  methods: {
    // 树数据加载
    loadTree(node, resolve) {
      // 默认加载一级，即数据库列表
      if (node.level === 0) {
        this.loadLevel1Node(resolve);
      }
      //动态从后台加载二级节点列表，表、视图等文件夹
      if (node.level === 1) {
        this.loadLevel2Node(node, resolve);
      }

      //动态从后台加载三级节点列表，具体的表列表、试图列表等
      if (node.level === 2) {
        this.loadLevel3Node(node, resolve);
      }
    },

    // 初始化页面
    initPageData() {
      // 填充页面 header 区域标题
      this.getUsername()

      // 获取数据源信息
      let dsInfo = this.$route.params.dsInfo
      if (dsInfo !== undefined) {
        localStorage.setItem('dsInfo', JSON.stringify(dsInfo))
      } else {
        dsInfo = JSON.parse(localStorage.getItem('dsInfo'))
      }
      this.dataSourceInfo = dsInfo
    },

    //加载第一级节点
    async loadLevel1Node(resolve) {
      this.$http.get('api/database/tree/level1?dataSourceId=' + this.dataSourceInfo.id)
          .then(res => {
            return resolve(res.data);
          })
    },

    //加载第二级节点
    async loadLevel2Node(node, resolve) {
      this.$http.get('api/database/tree/level2', {
        label: node.data.label,
        id: node.data.id,
      }).then(res => {
        return resolve(res.data);
      })
    },

    //加载第三级节点
    async loadLevel3Node(node, resolve) {
      let type = 0
      switch (node.data.id.slice(0, 3)) {
        case '2-t':
          type = 0
          break
        case '2-v':
          type = 1
          break
        case '2-p':
          type = 2
          break
        case '2-f':
          type = 3
          break
      }
      this.$http.post('api/database/tree/level3', {
        dataSourceId: this.dataSourceInfo.id,
        parentNode: node.data,
        rootNode: node.parent.data,
        type: type,
      }).then(res => {
        if (res.data != null) {
          return resolve(res.data);
        } else {
          return resolve([])
        }
      })
    },

    // 获取用户名称，显示在 Header 里
    getUsername() {
      // 从 token 里获取用户的 id 信息
      let payload = window.atob(localStorage.getItem('token').split('.')[1])
      const currentLoginUserId = JSON.parse(payload).id
      this.$http.get('api/user/' + currentLoginUserId)
          .then(res => {
            if (res.code === 0) {
              this.loginUser = res.data
            } else {
              this.$message.error('系统错误' + res.msg)
            }
          })
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
    createTab(type) {
      console.log(type)
      switch (type) {
        case 1:
          // 打开sql控制台
          break;

      }
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

    openCreateDbDialog() {
      this.dialogCreateDbVisible = true
      this.$http.get('api/database/characters?dataSourceId=' + this.dataSourceInfo.id)
          .then(res => {
            res.data.unshift('默认')
            this.characterSetNameList = res.data
          })
    },
    initCollations() {
      this.$http.get('api/database/collations?dataSourceId=' + this.dataSourceInfo.id, {
        characterSetName: this.databaseForm.characterSetName
      }).then(res => {
        res.data.unshift('默认')
        this.collationNames = res.data
      })
    },

    // 创建数据库
    createDb() {
      this.$http.post('api/database', {
        dataSourceId: this.dataSourceInfo.id,
        dbName: this.databaseForm.dbName,
        characterSetName: this.databaseForm.characterSetName === '默认' ? '' : this.databaseForm.characterSetName,
        collationName: this.databaseForm.collationName === '默认' ? '' : this.databaseForm.collationName,
      }).then(res => {
        if (res.code === 0) {
          this.$message.success("数据库创建成功~")
          this.$refs.tree.append(res.data, null)
          this.dialogCreateDbVisible = false
        } else {
          this.$message.error(res.msg)
        }
      })

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
  destroyed() {
    // localStorage.removeItem('dsInfo')
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
  flex: 1.1;
  height: 100%;
  border-right-style: inset;
  border-right-width: 2px;
  border-right-color: gainsboro;
  overflow-x: auto;
}

.container .left-box .left-top {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container .left-box .left-tree {
  height: calc(100% - 40px - 5px);
  margin-top: 5px;
  margin-left: 5px;
  /*margin-right: 5px;*/
  overflow: auto;
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
  flex: 4;
  margin-left: 2px;
}
</style>
