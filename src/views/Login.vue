<template>
  <div>
    <el-row type="flex" justify="center" align="middle" class="container">
      <!-- 登陆表单的div -->
      <div class="login-content">
        <div class="image">
          <img src="../assets/touxiang.png" alt />
        </div>
        <h3>管理员登录页面</h3>
        <!-- model：表单的数据对象 -->
        <el-form ref="form" :rules="rules" :model="form" label-width="auto" class="login">
          <el-form-item label="账号" prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" type="password"></el-input>
          </el-form-item>
          <el-form-item class="btn">
            <el-button type="primary" @click="submitForm">登录</el-button>
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
      },
      //   rules是表单校验规则
      rules: {
        username: [
          // required代表是否必填，message错误时候提示，trigger失去焦点时候触发
          { required: true, message: "请输入用户名", trigger: "blur" }
          //   { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }
          //   { min: 3, max: 16, message: "长度在 3 到 16 个字符", trigger: "blur" }
        ]
      }
    };
  },

  //   事件函数
  methods: {
    // 提交表单
    submitForm() {
      console.log(this.form);
      //   validate方法是element的表单才有的
      this.$refs.form.validate(valid => {
        console.log(valid);
        // valid为true的时候提交表单
        if (valid) {
          // 请求登录接口
          this.$axios({
            url: "/login",
            method: "POST",
            data: this.form
          }).then(res => {
            console.log(res);
            var { message, statusCode, data } = res.data;

            // 请求失败
            if (statusCode === 401) {
              this.$message.error(message);
              return;
            }

            // 请求成功
            this.$message.success(message);

            // 把用户信息保存到本地
            localStorage.setItem("user", JSON.stringify(data));

            // 跳转到后台管理首页
            setTimeout(() => {
              this.$router.push("/");
            }, 1000);
          });
        }
      });
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
  width: 420px;
  padding: 20px;
  background: #f6f6f6;
  border: 1px #ddd solid;
  h3 {
    text-align: center;
    font-size: 26px;
  }
  .image {
    text-align: center;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      border: 1px #ddd solid;
      margin-bottom: -20px;
    }
  }
  .login {
    box-sizing: border-box;
    padding: 0 30px;
  }
}
</style>