<template>
  <div class="mv-container">
    <div class="mv-wrap">
      <h3 class="title">mv详情</h3>
      <!-- mv -->
      <div class="video-wrap">
        <video controls
               autoplay
               :src="url"></video>
      </div>
      <!-- mv信息 -->
      <div class="info-wrap">
        <div class="singer-info">
          <div class="avatar-wrap">
            <img :src="icon+'?param=250y150'"
                 alt="" />
          </div>
          <span class="name">{{ mvInfo.artistName }}</span>
        </div>
        <div class="mv-info">
          <h2 class="title">{{ mvInfo.name }}</h2>
          <span class="date">发布：{{ mvInfo.publishTime }}</span>
          <span class="number">播放：{{ mvInfo.playCount }} 次</span>
          <p class="desc">
            {{ mvInfo.desc }}
          </p>
        </div>
      </div>
      <!-- 精彩评论 -->
      <div class="comment-wrap"
           v-if="hotComments !== undefined && hotComments.length !== 0">
        <p class="title">
          精彩评论<span class="number">({{ hotComments.length }})</span>
        </p>
        <div class="comments-wrap">
          <!-- 评论 -->
          <div class="item"
               v-for="(item, index) in hotComments"
               :key="index">
            <div class="icon-wrap">
              <!-- 头像 -->
              <img :src="item.user.avatarUrl+'?param=50y50'"
                   alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{ item.user.nickname }}</span>
                <span class="comment">：{{ item.content }}</span>
              </div>
              <!-- 回复 -->
              <div class="re-content"
                   v-if="item.beReplied.length !== 0">
                <span class="name">{{ item.beReplied[0].user.nickname }}</span>
                <span class="comment">：{{ item.beReplied[0].content }}</span>
              </div>
              <div class="date">{{ item.time | dateFormat }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 最新评论 -->
      <div class="comment-wrap">
        <p class="title">
          最新评论<span class="number">({{ total }})</span>
        </p>
        <div class="comments-wrap">
          <!-- 评论 -->
          <div class="item"
               v-for="(item, index) in comments"
               :key="index">
            <div class="icon-wrap">
              <!-- 头像 -->
              <img :src="item.user.avatarUrl+'?param=50y50'"
                   alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{ item.user.nickname }}</span>
                <span class="comment">：{{ item.content }}</span>
              </div>
              <!-- 回复 -->
              <div class="re-content"
                   v-if="item.beReplied.length !== 0">
                <span class="name">{{ item.beReplied[0].user.nickname }}</span>
                <span class="comment">：{{ item.beReplied[0].content }}</span>
              </div>
              <div class="date">{{ item.time | dateFormat }}</div>
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
    <div class="mv-recommend">
      <h3 class="title">相关推荐</h3>
      <div class="mvs">
        <div class="items">
          <div class="item"
               v-for="(item, index) in simiMvs"
               :key="index"
               @click="tomv(item.id)">
            <div class="img-wrap">
              <img :src="item.cover+'?param=250y150'"
                   alt="" />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">{{ item.playCount | playcountFormat }}</div>
              </div>
              <span class="time">{{ item.duration | playTimeFormat }}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{ item.name }}</div>
              <div class="singer">{{ item.artistName }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      //mv播放地址
      url: '',
      //
      icon: '',
      //mv信息
      mvInfo: [],
      //热门评论
      hotComments: [],
      pageSize: 15,
      total: 1,
      pageNum: 1,
      comments: [],
      // 相似mv
      simiMvs: [],
    }
  },
  methods: {
    getmvlist () {
      axios({
        url: 'http://localhost:3000/mv/url',
        method: 'get',
        params: { id: this.$route.query.id }
      }).then(res => {
        //console.log(res)
        this.url = res.data.data.url
      })
    }, getmvdetetail () {
      axios({
        url: 'http://localhost:3000/mv/detail',
        method: 'get',
        params: { mvid: this.$route.query.id }
      }).then(res => {
        //console.log(res)
        this.mvInfo = res.data.data
      })
    },
    gethotcomments () {
      axios({
        url: 'http://localhost:3000/comment/mv',
        method: 'get',
        params: {
          id: this.$route.query.id,
          limit: this.pageSize,
          offset: (this.pageNum - 1) * this.pageSize
        }
      }).then(res => {
        console.log(res)
        this.hotComments = res.data.hotComments
        this.comments = res.data.comments
        this.total = res.data.total
      })
    },
    getsimv () {
      axios({
        url: 'http://localhost:3000/simi/mv',
        method: 'get',
        params: {
          mvid: this.$route.query.id,
        }
      }).then(res => {
        //console.log(res)
        this.simiMvs = res.data.mvs
      })
    },
    handleCurrentChange (val) {
      this.pageNum = val
      this.gethotcomments()
    }
  },
  //!!! created被包括到methods里
  created () {
    this.getmvlist()
    this.gethotcomments()
    this.getsimv()
    this.getmvdetetail()
  }
}

</script>

<style>
</style>