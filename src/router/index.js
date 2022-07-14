import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/dataSource',
    name: 'dataSource',
    component: () => import('../views/DataSourceView.vue')
  },
  {
    path: '/mysql',
    name: 'MySQL',
    component: () => import('../views/MysqlView')
  }
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {
//   console.log(to.path)
//   if (to.path == '/login' || to.path == '/register') {
//     console.log(1)
//     next();
//   } else {
//     Message.error('您还没有登录，请先登录');
//     next('/login');
//   }
// })

export default router
