<template>
  <div class="discovery-container">
    <!--轮播图-->
    <el-carousel :interval="4000"
                 type="card"
                 height="200px">
      <el-carousel-item v-for="(item,index) in banners"
                        :key="index">
        <img :src="item.imageUrl" />
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
                  @click="playmucic(item.id)"></span>
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
import axios from 'axios'
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
    playmucic (id) {
      axios({
        url: 'http://localhost:3000/song/url',
        method: 'get',
        params: { id: id }
      }).then(res => {
        // 播放的音乐地址
        // 父组件传参
        this.$parent.musicUrl = res.data.data[0].url
        //console.log(this.$parent.musicUrl)
      })
    },
    toplaylist (id) {
      this.$router.push('/playlist?id=' + id)
    },
    tomv (id) {
      this.$router.push('/mv?id=' + id)
    }
  },
  created () {
    // 轮播图数据
    axios({
      url: 'http://localhost:3000/banner',
      method: 'get',
      params: {}
    }).then(res => {
      //console.log(res)
      this.banners = res.data.banners
    })
    //推荐歌单
    axios({
      url: 'http://localhost:3000/personalized?limit=12',
      method: 'get',
      params: {}
    }).then(res => {
      this.playList = res.data.result
      //console.log(this.playList)
    })
    //最新音乐
    axios({
      url: 'http://localhost:3000/personalized/newsong',
      method: 'get',
      params: {}
    }).then(res => {
      this.newSongs = res.data.result
      //console.log(this.newSongs)
    })
    //推荐MV
    axios({
      url: 'http://localhost:3000/personalized/mv',
      method: 'get',
      params: {}
    }).then(res => {
      //console.log(res)
      this.mvs = res.data.result
    })
  }
}
</script>

<style>
</style>