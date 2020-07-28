<template>
  <div>
    <el-card>
      <div>
        <!--选择板块 -->
        <el-tabs v-model="activeName"
                 stretch>
          <!--登录-->
          <el-tab-pane label="登录"
                       name="login">
            <el-form :model="loginForm"
                     status-icon
                     :rules="loginrules"
                     ref="loginFormref"
                     label-width="90px"
                     class="form">
              <el-form-item label="账号"
                            prop="userename">
                <el-input v-model="loginForm.userename"
                          placeholder="请输入账号"></el-input>
              </el-form-item>
              <el-form-item label="密码"
                            prop="password">
                <el-input type="password"
                          v-model="loginForm.password"
                          placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item class="dialog-footer">
                <el-button type="primary"
                           @click="login()">登录</el-button>
                <el-button @click="loginresetForm()">重置</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <!--注册-->
          <el-tab-pane label="注册"
                       name="logon">
            <el-form :model="registerForm"
                     status-icon
                     :rules="registerrules"
                     ref="registerFormref"
                     label-width="90px"
                     class="form">
              <el-form-item label="账号"
                            prop="userename">
                <el-input v-model="registerForm.userename"></el-input>
              </el-form-item>
              <el-form-item label="密码"
                            prop="password">
                <el-input type="password"
                          v-model="registerForm.password"></el-input>
              </el-form-item>
              <el-form-item label="确认密码"
                            prop="password">
                <el-input v-model="registerForm.repassword"></el-input>
              </el-form-item>
              <el-form-item label="验证码"
                            prop="verification">
                <el-input v-model="registerForm.verification"
                          placeholder="请输入内容"
                          maxlength="4"
                          minlength="1">
                  <el-button slot="append">获取验证码</el-button>
                </el-input>
              </el-form-item>
              <el-form-item class="dialog-footer">
                <el-button type="primary">下一步</el-button>
                <el-button @click="resetForm()">重置</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>

  </div>
</template>

<script>
export default {
  data () {
    // 验证码
    var checkeverification = (rule, val, callback) => {
      const regeverification = /^[0-9]{4}$/;
      if (regeverification.test(val)) {
        // 合法
        return callback();
      }
      callback(new Error("请输入合法验证码"));
    };
    return {
      //当前选中的模块：登录或者是注册
      activeName: 'login',
      //用户id
      account: '',
      //登录用户信息
      loginForm: {
        userename: "18959204851",
        password: "fhyf5218161"
      },
      //表单验证
      loginrules: {
        userename: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          { min: 6, max: 18, message: "长度在 6 到 18 个字符", trigger: "blur" }
        ]
      },
      //登录用户信息
      registerForm: {
        userename: "",
        password: "",
        repassword: "",
        verification: ""
      },
      //表单验证
      registerrules: {
        userename: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          { min: 6, max: 18, message: "长度在 6 到 18 个字符", trigger: "blur" }
        ],
        verification: [
          { required: true, message: "请输入正确验证码", trigger: "blur" },
          { validator: checkeverification, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event);
    },
    loginresetForm () {
      this.$refs.loginFormref.resetFields();
    },
    resetForm () {
      this.$refs.registerFormref.resetFields();
    },
    //登录
    login () {
      this.$refs.loginFormref.validate(async valid => {
        if (!valid) return false
        // 发起登录请求
        const { data: result } = await this.$http.get('/login/cellphone', {
          params: {
            phone: this.loginForm.userename,
            password: this.loginForm.password
          }
        })
        //console.log(result)
        this.account = result.account
        this.$message.success('登录成功')
        window.sessionStorage.setItem('token', result.token)
        window.sessionStorage.setItem('uid', result.account.id)
        //保存cookie
        document.cookie = result.cookie
        // 页面跳转
        this.$router.push('/discovery')
        //！！！强制刷新页面，变化按钮
        this.$router.go(0)
      })
    }
  }
};
</script>

<style scoped>
.dialog-footer {
  margin-right: 15px;
  text-align: right;
  width: 100%;
}
.form {
  margin-top: 15px;
  bottom: 0;
  padding: 0 25px 0 0;
  box-sizing: border-box;
}
</style>