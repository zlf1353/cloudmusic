<template>
  <div class="index-container">
    <!--主体-->
    <!--!!!el-container导致宽度失效-->
    <div class="nav">
      <!--侧边栏-->
      <el-aside style="width:200px">
        <!--菜单-->
        <!--单个展开-->
        <el-menu background-color="#ededed"
                 active-text-color="#dd6d60"
                 router
                 :default-active="activepath"
                 class="nav">
          <!--一级菜单-->
          <!--!!!el-menu-item 每个el-menu-item的index是跳转的路径，可以理解为配置路由中的path-->
          <!--!!!:index="'/'+item.id" -->
          <el-menu-item v-for="item in menulist"
                        :index="'/'+item.id"
                        :key="item.id">
            <template slot="title">
              <!--图标-->
              <i :class=item.iconobj></i>
              <!--文本-->
              <span>{{item.name}}</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!--主页-->
    </div>
    <!--!!!el-container导致轮播图ul位置错位-->
    <el-container class="main">
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    <!--播放器-->
    <div class="player">
      <audio :src="musicUrl"
             autoplay
             controls></audio>
    </div>
  </div>

</template>

<script>
export default {
  name: "menu",
  data () {
    return {
      activepath: '',
      // !!!
      menulist: [
        { name: "发现音乐", iconobj: "el-icon-user-solid", id: "discovery" },
        { name: "推荐歌单", iconobj: "el-icon-user-solid", id: "2" },
        { name: "最新音乐", iconobj: "el-icon-user-solid", id: "3" },
        { name: "最新MV", iconobj: "el-icon-user-solid", id: "4" },
      ]
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.menuaside {
  width: 200px;
}
</style>>