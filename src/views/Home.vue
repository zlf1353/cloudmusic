<template>
  <div id="app">
    <top />
    <leftmenu />
  </div>
</template>

<script>
//引入组件
//头部
import top from '../components/top'
import leftmenu from '../components/menu'
export default {
  name: "Home",
  //组件需要注册
  components: {
    top,
    leftmenu
  }
}
</script>

<style >
</style>
