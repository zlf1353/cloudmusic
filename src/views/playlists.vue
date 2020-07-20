<template>
  <div class="playlists-container">
    <!-- 同步 -->
    <div class="top-card">
      <!-- 封面 -->
      <div class="icon-wrap">
        <img :src="topPlayList.coverImgUrl+'?param=200y200'"
             alt="" />
      </div>
      <div class="content-wrap">
        <div class="tag">精品歌单</div>
        <!-- 标题 -->
        <div class="title">
          {{ topPlayList.title }}
        </div>
        <!-- 介绍 -->
        <div class="info">
          {{ topPlayList.description }}
        </div>
      </div>
      <!-- 背景 -->
      <img :src="topPlayList.coverImgUrl"
           class="bg" />
      <div class="bg-mask"></div>
    </div>

    <div class="tab-container">
      <!-- tab栏 顶部 -->
      <div class="tab-bar">
        <span class="item"
              @click="tag = '全部'"
              :class="{ active: tag === '全部' }">全部</span>
        <span class="item"
              @click="tag = '欧美'"
              :class="{ active: tag === '欧美' }">欧美</span>
        <span class="item"
              @click="tag = '华语'"
              :class="{ active: tag === '华语' }">华语</span>
        <span class="item"
              @click="tag = '流行'"
              :class="{ active: tag === '流行' }">流行</span>
        <span class="item"
              @click="tag = '说唱'"
              :class="{ active: tag === '说唱' }">说唱</span>
        <span class="item"
              @click="tag = '摇滚'"
              :class="{ active: tag === '摇滚' }">摇滚</span>
        <span class="item"
              @click="tag = '民谣'"
              :class="{ active: tag === '民谣' }">民谣</span>
        <span class="item"
              @click="tag = '电子'"
              :class="{ active: tag === '电子' }">电子</span>
        <span class="item"
              @click="tag = '轻音乐'"
              :class="{ active: tag === '轻音乐' }">轻音乐</span>
        <span class="item"
              @click="tag = '影视原声'"
              :class="{ active: tag === '影视原声' }">影视原声</span>
        <span class="item"
              @click="tag = 'ACG'"
              :class="{ active: tag === 'ACG' }">ACG</span>
        <span class="item"
              @click="tag = '怀旧'"
              :class="{ active: tag === '怀旧' }">怀旧</span>
        <span class="item"
              @click="tag = '治愈'"
              :class="{ active: tag === '治愈' }">治愈</span>
        <span class="item"
              @click="tag = '旅行'"
              :class="{ active: tag === '旅行' }">旅行</span>
      </div>
      <!-- tab的内容区域 -->
      <div class="tab-content">
        <div class="items">
          <div class="item"
               v-for="(item, index) in playlists"
               :key="index"
               @click="toPlaylist(item.id)">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{ item.playCount | playcountFormat}}</span>
              </div>
              <img :src="item.coverImgUrl+'?param=200y200'"
                   alt="" />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{ item.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页器 -->
    <el-pagination @current-change="handleCurrentChange"
                   background
                   layout="prev, pager, next"
                   :total="total"
                   :current-page="pageNum"
                   :page-size="pageSize">
    </el-pagination>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'playlists',
  data () {
    return {
      // 所有的精品歌单
      topPlayLists: [],
      // 当前推荐
      topPlayList: [],
      // 推荐歌单
      playlists: [],
      // 歌单总数
      total: 1,
      // 当前页面
      pageNum: 1,
      //页面容量
      pageSize: 12,
      // 当前标签
      tag: '全部'
    }
  },
  //!!!监听器
  watch: {
    tag () {
      this.getplaylist()
      this.pageNum = 1
    }
  },
  //!!!methods 有s
  methods: {
    handleCurrentChange (val) {
      // ！！！需要更改标签数据，传入一个页面的页数，不会自动修改pagenum
      this.pageNum = val
      this.getplaylist()
    },
    getplaylist () {
      axios({
        url: 'http://localhost:3000/top/playlist/highquality',
        method: 'get',
        params: { limit: 1, cat: this.tag }
      }).then(res => {
        //console.log(res)
        this.topPlayLists = res.data.playlists
        this.topPlayList = this.topPlayLists[0]
      })
      axios({
        url: 'http://localhost:3000/top/playlist',
        method: 'get',
        params: { offset: (this.pageNum - 1) * this.pageSize, limit: this.pageSize, cat: this.tag }
      }).then(res => {
        //console.log(res)
        this.playlists = res.data.playlists
        //console.log(typeof (this.playlists[0].playCount))
        this.total = res.data.total
      })
    },
    toPlaylist (id) {
      // 大小写错误
      this.$router.push('/playlist?id=' + id)
    }
  },
  created () {
    this.getplaylist()
  }
}
</script>

<style>
</style>