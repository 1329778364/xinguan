<template>
  <div class="Login">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 col-md-8 m-auto pt-5">
          <div class="card mt-5">
            <div class="card-header">
              <h3 class="text-center mb-0 text-second">{{ $conf.logo }}</h3>
            </div>
            <div class="card-body">
              <el-form ref="form" :rules="rules" :model="form">
                <el-form-item label="" prop="username">
                  <el-input
                    v-model="form.username"
                    size="medium"
                    placeholder="请输入用户名"
                  />
                </el-form-item>
                <el-form-item label="" prop="password">
                  <el-input
                    v-model="form.password"
                    size="medium"
                    placeholder="请输入密码"
                  />
                </el-form-item>
                <el-form-item label="">
                  <el-button
                    @click="submit"
                    class="w-100"
                    size="medium"
                    type="primary"
                    >立即登录</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate(e => {
        this.$router.push({ name: "Home" });
      });
    }
  }
};
</script>
