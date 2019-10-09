<template>
  <div>
    <el-container class="container">
      <!-- 侧边栏 -->
      <el-aside width="250px">
        <div class="logo">黑马头条</div>
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>文章管理</span>
            </template>
            <router-link to="/postlist">
              <el-menu-item index="1-1">文章列表</el-menu-item>
            </router-link>
            <router-link to="/postadd">
              <el-menu-item index="1-2">发布文章</el-menu-item>
            </router-link>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 头部 -->
        <el-header height="100px">
          <div class="head">
            <img :src="$axios.defaults.baseURL+user.user.head_img" v-if="user.user.head_img" alt />
            <img src="../assets/touxiang1.png" v-else alt />
            <span class="nickname">{{user.user.nickname}}</span>
            <span @click="handleremove" class="remove">退出</span>
          </div>
        </el-header>
        <!-- 主体，子组件页面显示的内容 -->
        <el-main>
          <div class="navigation">{{breaks}}</div>
          <!-- 显示子路由匹配的页面 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user") || "{}")
    };
  },

  // computed里面的函数监听到函数中引用的所有实例下的属性的变化
  computed: {
    breaks() {
      // console.log(breaks);
      const { matched } = this.$route;
      const arr = [];

      matched.forEach(v => {
        arr.push(v.meta);
      });

      return arr.join("/");
    }
  },

  // 事件函数
  methods: {
    handleremove() {
      this.$confirm("确定退出管理?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        localStorage.removeItem("user");
        this.$router.push("/login");
      });
    }
  },

  //   页面加载完触发
  mounted() {}
};
</script>

<style scoped lang="less">
.container {
  background: #f6f6f6;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: right;
  line-height: 100px;
  padding-right: 60px;

  .head {
    * {
      vertical-align: middle;
    }
    box-sizing: border-box;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 10px;
      border: 1px #eee solid;
    }
    .nickname {
      padding-right: 40px;
    }
    .remove {
      cursor: pointer;
    }
  }
}

.el-aside {
  background-color: #545c64;
  color: #333;
  text-align: center;
  .logo {
    width: 250px;
    height: 100px;
    line-height: 100px;
    color: #fff;
    font-size: 28px;
    background: #333;
  }
}
.el-menu {
  border-right: none;
}
.navigation {
  padding-bottom: 20px;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>