<template>
  <div id="app">
    <top />
    <leftmenu />
  </div>
</template>

<script>
//引入组件
//头部a
import top from '../components/top'
import leftmenu from '../components/leftmenu'
export default {
  name: "Home",
  //组件需要注册
  components: {
    top,
    leftmenu
  }
}
</script>

<style scoped>
</style>>
