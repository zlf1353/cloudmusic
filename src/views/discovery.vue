<template>
  <div class="discovery-container">
    <!--轮播图-->
    <el-carousel :interval="4000"
                 type="card"
                 height="200px">
      <el-carousel-item v-for="(item,index) in banners"
                        :key="index">
        <img :src="item.imageUrl"
             @click="toMvorPlaylist(item)" />
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <div class="recommend">
      <h3 class="title">
        推荐歌单
      </h3>
      <div class="items">
        <div class="item"
             v-for="(item, index) in playList"
             :key="index">
          <div class="img-wrap"
               @click="toplaylist(item.id)">
            <div class="desc-wrap">
              <span class="desc">{{ item.copywriter }}</span>
            </div>
            <img :src="item.picUrl+'?param=200y200'" />
            <span class="iconfont icon-play"></span>
          </div>
          <p class="name">{{ item.name }}</p>
        </div>
      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="news">
      <h3 class="title">
        最新音乐
      </h3>
      <div class="items">
        <div class="item"
             v-for="(item, index) in newSongs"
             :key="index">
          <div class="img-wrap">
            <img :src="item.picUrl+'?param=130y130'"
                 alt="" />
            <span class="iconfont icon-play"
                  @click="playMusic(item.id)"></span>
          </div>
          <div class="song-wrap">
            <div class="song-name">{{ item.name }}</div>
            <div class="singer">{{ item.song.artists[0].name }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐MV -->
    <div class="mvs">
      <h3 class="title">推荐MV</h3>
      <div class="items">
        <div class="item"
             v-for="(item, index) in mvs"
             :key="index">
          <div class="img-wrap">
            <img :src="item.picUrl+'?param=250y150'"
                 alt="" />
            <!--图标按钮-->
            <span class="iconfont icon-play"
                  @click="tomv(item.id)"></span>
            <div class="num-wrap">
              <!--播放量和按钮-->
              <div class="iconfont icon-play"></div>
              <div class="num">{{ item.playCount }}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{ item.name }}</div>
            <div class="singer">{{ item.artistName }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "discovery",
  data () {
    return {
      //轮播图数据
      banners: [],
      //推荐歌单
      playList: [],
      //最新音乐
      newSongs: [],
      //推荐mv
      mvs: []
    }
  },
  methods: {
    // 轮播图点击跳转
    toMvorPlaylist (item) {
      //console.log(item.targetType)
      //mv
      console.log(item.targetType)
      if (item.targetType == '1004') {
        this.tomv(item.targetId)
      } else if (item.targetType == '10') {
        this.$message.warning("暂未开放")
      } else if (item.targetType == '1') {
        this.playMusic(item.targetId)
      } else if (item.targetType == '3000' || item.targetType == '0') {
        this.$message.warning("暂未开放")
      }
    },
    // 播放音乐
    async playMusic (id) {
      //{data:res}是解构，把返回的数据的data作为数据res
      const res = await this.$http.get('/song/url', {
        params: {
          cookie: document.cookie,
          id: id,
        }
      }).catch(() => {
        this.$message.error('没有权限')
      })
      // 播放的音乐地址
      // 父组件传参
      if (!res.data.data[0].url) {
        this.$message.error('没有权限')
      }
      this.$parent.musicUrl = res.data.data[0].url
      //console.log(this.$parent.musicUrl)
    },
    // 跳转歌单页面
    toplaylist (id) {
      this.$router.push('/playlist?id=' + id)
    },
    // 跳转mv页面
    tomv (id) {
      this.$router.push('/mv?id=' + id)
    },
    // 轮播图数据
    async getbanner () {
      const res = await this.$http.get('/banner', {
        params: {}
      })
      console.log(res)
      this.banners = res.data.banners
      if (!res) return this.$message.error("错误")
    },
    //推荐歌单
    async getpersonalized () {
      const res = await this.$http.get('/personalized?limit=12', {
        params: {}
      })
      this.playList = res.data.result
    },
    //最新音乐
    async getnewsong () {
      const res = await this.$http.get('/personalized/newsong', {
        params: {
          cookie: document.cookie
        }
      })
      this.newSongs = res.data.result
    },
    //推荐MV
    async getnewmv () {
      const res = await this.$http.get('/personalized/mv', {
        params: {
          cookie: document.cookie
        }
      })
      this.mvs = res.data.result
    }
  },
  created () {
    this.getbanner()
    this.getpersonalized()
    this.getnewsong()
    this.getnewmv()
  }
}
</script>

<style>
</style>