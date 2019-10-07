import Vue from 'vue'
import Router from 'vue-router';

import Login from '@/views/Login.vue'

Vue.config.productionTip = false
// 注册路由插件
Vue.use(Router)


// 创建路由对象
export default new Router({
  // 默认的声明
  mode: 'history',
  // 可忽略
  base: process.env.BASE_URL,

  // 路由的配置
  routes: [{
    path: "/login",
    component: Login
  }]
})