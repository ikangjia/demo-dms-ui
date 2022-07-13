import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/dataSource',
    name: 'dataSource',
    component: () => import('../views/DataSourceView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
