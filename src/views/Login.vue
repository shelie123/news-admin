<template>
  <div>
    <el-row type="flex" justify="center" align="middle" class="container">
      <!-- 登陆表单的div -->
      <div class="login-content">
        <h3>管理员登录页面</h3>
        <el-form ref="form" :model="form" label-width="auto" class="login">
          <el-form-item label="账户">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item class="btn">
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },

  //   事件函数
  methods: {
    // 提交表单
    submitForm() {
      console.log(this.form);
    }
  }
};
</script>

<style scoped lang="less">
.container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}

.login-content {
  width: 400px;
  padding: 20px;
  background: #f6f6f6;
  border: 1px #ddd solid;
  h3 {
    text-align: center;
    font-size: 26px;
    padding-bottom: 10px;
  }
  .login {
    box-sizing: border-box;
    padding: 0 30px;
  }

}
</style>