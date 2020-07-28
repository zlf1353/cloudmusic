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
    <!--!!!el-container导致两条滚动条-->
    <div class="main">
      <!--el-main 导致音乐无法播放-->
      <!--加了el-main相当于父节点的父节点$parent.$parent,main 不影响-->
      <router-view></router-view>
    </div>
    <!--播放器-->
    <div class="player">
      <audio :src="musicUrl"
             autoplay
             controls
             id="music"
             class="btmplayer"
             @ended="nextmusic()"></audio>
      <!--@ended监听播放完毕-->
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import axios from 'axios'
export default {
  name: "leftmenu",
  data () {
    return {
      activepath: 'discovery',
      // !!!
      menulist: [
        { name: "发现音乐", iconobj: "el-icon-user-solid", id: "discovery" },
        { name: "推荐歌单", iconobj: "el-icon-user-solid", id: "playlists" },
        { name: "最新音乐", iconobj: "el-icon-user-solid", id: "songs" },
        { name: "全部MV", iconobj: "el-icon-user-solid", id: "mvs" },
      ],
      // 播放的音乐地址
      musicUrl: '',
      //播放列表的音乐歌曲id
      tobeplayedmusic: [],
      //待播的index
      index: 0
    }
  },
  methods: {
    async nextmusic () {
      //console.log(this.tobeplayedmusic[this.index])
      //歌单播放，当播放结束的时候
      const { data: res } = await this.$http.get('/song/url', {
        params: {
          cookie: document.cookie,
          id: this.tobeplayedmusic[this.index]
        }
      })
      this.musicUrl = res.data.data[0].url
      this.index += 1
    }
  },
  mounted () {
    //订阅消息
    // eslint-disable-next-line no-unused-vars
    this.$pubSub.subscribe('pauseAudio', msg => {
      var audio = document.getElementById('music')
      audio.pause()
    })
  }
}
</script>

<style scoped>
.menuaside {
  width: 200px;
}
.ahome {
  overflow-x: hidden;
  overflow-y: hidden;
}
.btmplayer {
  height: 60px;
  border: 0;
}
</style>>