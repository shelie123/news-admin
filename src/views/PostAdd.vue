<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px" style="width:80%">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">文章</el-radio>
          <el-radio :label="2">视频</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="内容" v-if="form.type===1">
        <VueEditor :config="config" ref="vueEditor" />
      </el-form-item>
      <el-form-item label="视频" v-if="form.type===2">
        <el-upload
          :action="`${$axios.defaults.baseURL}/upload`"
          name="file"
          :headers="{
             Authorization:token
          }"
          :on-success="handleVideoSuccess"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item label="栏目">
        <!-- 栏目的数据来自于后台 -->
        <el-checkbox-group v-model="form.categories">
          <!-- allCate所有的栏目 -->
          <el-checkbox
            v-for="(item,index) in allCate"
            :key="index"
            v-if="item.id !==999"
            :label="item.id"
            name="type"
          >{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="封面">
        <!-- action：上传图片的链接
        list-type:声明当前是上传多张图片
        on-success:图片上传成功的函数
        on-remove:移出图片函数
        -->
        <el-upload
          :action="`${$axios.defaults.baseURL}/upload`"
          name="file"
          :headers="{
            Authorization:token
          }"
          list-type="picture-card"
          :on-success="handleSuccess"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">发表文章</el-button>
        <el-button>取消发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import VueEditor from "vue-word-editor";
import "quill/dist/quill.snow.css";

export default {
  name: "app",
  data() {
    return {
      // 表单的数据对象
      form: {
        title: "", // 文章标题
        content: "", // 文章内容
        categories: [], // 所属栏目id
        cover: [], // 封面id
        type: 1 //文章类型
      },
      // 栏目列表
      allCate: [],
      token: JSON.parse(localStorage.getItem(`user`) || `{}`).token,

      // 编辑器的配置
      config: {
        // 上传图片的配置
        uploadImage: {
          url: this.$axios.defaults.baseURL + "/upload",
          name: "file",
          // 添加头信息
          headers: {
            Authorization: JSON.parse(localStorage.getItem("user") || `{}`)
              .token
          },
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess: (res, insert) => {
            insert(this.$axios.defaults.baseURL + res.data.data.url);
          }
        },

        // 上传视频的配置
        uploadVideo: {
          url: this.$axios.defaults.baseURL + "/upload",
          name: "file",
          headers: {
            Authorization: JSON.parse(localStorage.getItem("user") || `{}`)
              .token
          },
          uploadSuccess: (res, insert) => {
            insert(this.$axios.defaults.baseURL + res.data.data.url);
          }
        }
      }
    };
  },
  // 注册组件
  components: {
    VueEditor
  },
  // 事件函数
  methods: {
    onSubmit() {
      // console.log(this.form.cover);
      const { categories } = this.form;
      this.form.categories = [];
      // 给栏目把数字转换成接口需要的对象
      categories.forEach(v => {
        this.form.categories.push({
          id: v
        });
      });

      // 使用refs获取编辑器中内容
      if (this.form.type === 1) {
        this.form.content = this.$refs.vueEditor.editor.root.innerHTML;
      }

      this.$axios({
        url: "/post",
        method: "POST",
        headers: {
          Authorization: JSON.parse(localStorage.getItem("user") || `{}`).token
        },
        data: this.form
      }).then(res => {
        // console.log(res);
        const { message } = res.data;
        this.$message.success(message);
      });
    },
    // 视频上传事件
    handleVideoSuccess(res) {
      // 把视频连接保存到content
      this.form.content = this.$axios.defaults.baseURL + res.data.url;
    },

    // 移出图片的时候触发的函数
    handleRemove(file, fileList) {
      // console.log(file, fileList);
      const id = file.response.data.id;
      const arr = [];

      this.form.cover.forEach(v => {
        // 从cover中删除掉已经移出的图片
        if (v.id !== id) {
          arr.push(v);
        }
      });
      this.form.cover = arr;
    },

    // 图片上传成功的回调函数
    handleSuccess(res, file) {
      // console.log(res, file);
      this.form.cover.push({
        id: res.data.id
      });
    }
  },
  mounted() {
    // 请求栏目的数据
    this.$axios({
      url: "/category"
    }).then(res => {
      // console.log(res.data);
      const { data } = res.data;
      this.allCate = data;
    });
  }
};
</script>

<style>
</style>