import Vue from 'vue'
import Router from 'vue-router';

import Login from '@/views/Login.vue'

// 管理首页
import Index from "@/views/Index.vue"

// 子页面
import PostList from "@/views/PostList"
import PostAdd from "@/views/PostAdd"

import PostEdit from "@/views/PostEdit"

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
    },
    {
      path: "/",
      component: Index,
      meta: "文章管理",
      children: [
        // 一个路径对应一个组件，子路由的path不能带斜杠
        {
          path: "postlist",
          component: PostList,
          meta: "文章列表"
        },
        {
          path: "postadd",
          component: PostAdd,
          meta: "发布文章"
        },
        {
          path: "postedit/:id",
          component: PostEdit,
          meta: "编辑文章"
        }
      ]
    }
  ]
})