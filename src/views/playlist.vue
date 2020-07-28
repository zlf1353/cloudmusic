<template>
  <div class="playlist-container">
    <!-- 顶部 -->
    <div class="top-wrap">
      <div class="img-wrap">
        <!-- 封面 -->
        <img :src="playlist.coverImgUrl"
             alt="" />
      </div>
      <div class="info-wrap">
        <!-- 名字 -->
        <p class="title">{{ playlist.name }}</p>
        <div class="author-wrap">
          <!-- 头像 -->
          <!-- 不加v-if="playlist.creator !== undefined" 报错 -->
          <img class="avatar"
               :src="playlist.creator.avatarUrl"
               v-if="playlist.creator !== undefined"
               alt="" />
          <!-- 名字 -->
          <span class="name"
                v-if="playlist.creator !== undefined">{{ playlist.creator.nickname }}</span>
          <!-- 时间 -->
          <span class="time">{{ playlist.createTime | dateFormat }}</span>
        </div>
        <div class="play-wrap">
          <span class="iconfont icon-circle-play"></span>
          <span class="text">播放全部</span>
        </div>
        <div class="tag-wrap">
          <span class="title">标签:</span>
          <ul>
            <li v-for="(item, index) in playlist.tags"
                :key="index">{{ item }}</li>
          </ul>
        </div>
        <div class="desc-wrap">
          <span class="title">简介:</span>
          <span class="desc">{{ playlist.description }}</span>
        </div>
      </div>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲列表"
                   name="1">
        <table class="el-table playlit-table">
          <thead>
            <th></th>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr class="el-table__row"
                v-for="(item, index) in playlist.tracks"
                :key="index">
              <td>{{ index + 1 }}</td>
              <td>
                <div class="img-wrap"
                     @click="playMusic(item.id,index)">
                  <img :src="item.al.picUrl+'?param=130y130'"
                       alt="" />
                  <span class="iconfont icon-play"></span>
                </div>
              </td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <!-- 名称 -->
                    <span>{{ item.name }}</span>
                    <!-- mv图标 -->
                    <span v-if="item.mv !== 0"
                          class="iconfont icon-mv"
                          @click="toMv(item.mv)"></span>
                  </div>
                </div>
              </td>
              <td>{{ item.ar[0].name }}</td>
              <td>{{ item.al.name }}</td>
              <td>{{ item.dt | playTimeFormat }}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane :label="`评论(${total})`"
                   name="2">
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
      </el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      //歌单信息
      playlist: [],
      // 歌舞列表和评论切换
      activeIndex: "1",
      // 评论数
      total: 1,
      //热门评论
      hotComments: [],
      //最近评论
      comments: [],
      pageNum: 1,
      pageSize: 30,
      //播放列表的音乐歌曲id
      tobeplayedmusic: []
    }
  },
  methods: {
    getplaylist () {
      axios({
        url: 'http://localhost:3000/playlist/detail',
        method: 'get',
        params: { id: this.$route.query.id }
      }).then(res => {
        this.playlist = res.data.playlist
        //console.log(this.playlist)
      })
    },
    gethotcomments () {
      axios({
        url: 'http://localhost:3000/comment/playlist',
        method: 'get',
        params: {
          id: this.$route.query.id,
          limit: this.pageSize,
          offset: (this.pageNum - 1) * this.pageSize
        }
      }).then(res => {
        //console.log(res)
        this.hotComments = res.data.hotComments
        this.comments = res.data.comments
        this.total = res.data.total
        //console.log(this.total)
      })
    },
    handleCurrentChange (val) {
      this.pageNum = val
      this.gethotcomments()
    },
    // 播放音乐
    async playMusic (id, index) {
      axios({
        url: 'http://localhost:3000/song/url',
        method: 'get',
        params: {
          id: id,
          cookie: document.cookie
        }
      }).then(res => {
        // 播放的音乐地址
        // 父组件传参
        this.tobeplayedmusic = []
        for (let i = index + 1; i < this.playlist.tracks.length; i++) {
          this.tobeplayedmusic.push(this.playlist.tracks[i].id)
        }
        if (!res.data.data[0].url) {
          return this.$message.error('没有权限')
        }
        this.$parent.musicUrl = res.data.data[0].url
        this.$parent.tobeplayedmusic = this.tobeplayedmusic
      })
    }

  },
  created () {
    //console.log(this.$route.query.id)
    this.getplaylist()
    this.gethotcomments()
  }
}
</script>

<style>
</style>