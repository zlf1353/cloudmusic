<template>
  <div class="top-container">
    <div class="left-box">
      <div class="icon-wrapper">
        <span class="iconfont icon-home"></span>
        <span class="iconfont icon-fullscreen"></span>
        <!--！！！.icon-fullscreen才是引入的名字-->
      </div>
    </div>
    <div class="right-box ">
      <el-button size="small"
                 class="myrightbox"
                 v-if="status=='登录'"
                 @click="login()">{{status}}</el-button>
      <el-button size="small"
                 class="myrightbox"
                 v-else
                 @click="topersonalinfo()">{{status}}</el-button>
      <el-input placeholder="搜索"
                prefix-icon="el-icon-search"
                v-model="searchvalue"
                size="small"
                @change="toResult()">
        <!--@keyup.enter回车键弹起-->
        <!--el-inut 使用change 需要@ 仅在输入框失去焦点或用户按下回车时触发-->
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: "top",
  data () {
    return {
      //搜索的值
      searchvalue: ""
    }
  },
  watch: {
    status () {
      if (status == "个人中心")
        this.$forceUpdate()
    }
  },
  methods: {
    toResult () {
      // 如果没有填入搜索值
      if (this.searchvalue == "") {
        return this.$message.warning('请输入要搜索的值')
      }
      //！！！ 页面跳转，携带参数 携带在页面路由中
      this.$router.push('/result?q=' + this.searchvalue)
    },
    login () {
      this.$router.push('/login')
    },
    topersonalinfo () {
      this.$router.push('/personalinfo')
    }
  },
  computed: {
    status () {
      if (document.cookie) {
        return '个人中心'
      }
      //一定要有返回值
      return '登录'
    }
  }
}
</script>

<style scoped>
.myrightbox {
  margin-right: 15px;
}
</style>>