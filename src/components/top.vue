<template>
  <div class="top-container">
    <div class="left-box">
      <div class="icon-wrapper">
        <span class="iconfont icon-home"></span>
        <!-- -->
        <span class="iconfont icon-full-screen"></span>
      </div>
    </div>
    <div class="right-box">
      <el-input placeholder="搜索"
                prefix-icon="el-icon-search"
                v-model="searchvalue"
                size="small">
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: "top",
  data () {
    return {
      searchvalue: ""
    }
  }
}
</script>

<style scoped>
</style>>