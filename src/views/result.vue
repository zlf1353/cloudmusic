<template>
  <div class="result-container">
    <div class="title-wrap">
      <h2 class="title"
          :keywords="(keywords = $route.query.q)">{{ $route.query.q }}</h2>
      <!--$route.query.q获取页面传入的数据-->
      <span class="sub-title">{{ count }}</span>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲"
                   name="songs">
        <table class="el-table">
          <thead>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr class="el-table__row"
                v-for="(item, index) in songs"
                :key="index"
                @click="playmucic(item.id)">
              <td>{{ index + 1 }}</td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <!-- 名称 -->
                    <span>{{ item.name }}</span>
                    <!-- mv图标 -->
                    <span v-if="item.mvid !== 0"
                          class="iconfont icon-mv"
                          @click.stop="toMv(item.mvid)"></span>
                  </div>
                  <!-- 二级标题 -->
                  <span v-if="item.alias.length !== 0">{{ item.alias[0] }}</span>
                </div>
              </td>
              <td>{{ item.artists[0].name }}</td>
              <td>{{ item.album.name }}</td>
              <td>{{ item.duration | playTimeFormat }}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>

      <el-tab-pane label="歌单"
                   name="lists">
        <div class="items">
          <div class="item"
               v-for="(item, index) in playlists"
               :key="index">
            <div class="img-wrap"
                 @click="tothePlaylist(item.id)">
              <div class="num-wrap">
                播放量:
                <span class="num">{{ item.playCount | playcountFormat }}</span>
              </div>
              <img :src="item.coverImgUrl+'?param=200y200'"
                   alt="" />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{ item.name }}</p>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="MV"
                   name="mv">
        <div class="items mv">
          <div class="item"
               v-for="(item, index) in mvs"
               :key="index">
            <div class="img-wrap"
                 @click="toMv(item.id)">
              <img :src="item.cover+'?param=250y150'"
                   alt="" />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">{{ item.playCount | playcountFormat}}</div>
              </div>
              <span class="time">{{ item.duration}}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{ item.name }}</div>
              <div class="singer">{{ item.artistName }}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

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
  data () {
    return {
      // 歌曲列表
      songs: [],
      //搜索结果总数
      count: 1,
      //搜索的类型页面
      activeIndex: "songs",
      total: 1,
      pageNum: 1,
      pageSize: 30,
      // 搜索类型
      type: 1,
      playlists: [],
      mvs: []
    }
  },
  watch: {
    activeIndex () {
      if (this.activeIndex == "songs") {
        this.type = 1
        this.pageSize = 30
      } else if (this.activeIndex == "lists") {
        this.type = 1000
        this.pageSize = 12
      } else if (this.activeIndex == "mv") {
        this.pageSize = 8
        this.type = 1004
      }
      this.searchmusiclist()
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.pageNum = val
      this.searchmusiclist()
    },
    //获取歌曲列表
    searchmusiclist () {
      axios({
        url: 'http://localhost:3000/search',
        method: 'get',
        params: {
          keywords: this.$route.query.q,
          type: this.type,
          limit: this.pageSize,
          offset: (this.pageNum - 1) * this.pageSize
        }
      }).then(res => {
        //console.log(this.activeIndex)
        if (this.activeIndex == "songs") {
          this.songs = res.data.result.songs
          this.total = res.data.result.songCount
        } else if (this.activeIndex == "lists") {
          this.playlists = res.data.result.playlists
          this.total = res.data.result.playlistCount
        } else if (this.activeIndex == "mv") {
          //!!!数据赋值错误
          this.total = res.data.result.mvCount
          this.mvs = res.data.result.mvs
        }
        //console.log(this.mvs)
        this.count = res.data.result.songCount
      })
    },
    playmucic (id) {
      axios({
        url: 'http://localhost:3000/song/url',
        method: 'get',
        params: { id: id }
      }).then(res => {
        //console.log(id)
        this.$parent.musicUrl = res.data.data[0].url
      })
    },
    // 跳转歌单页面
    //!!! 不能叫toPlaylist
    tothePlaylist (id) {
      this.$router.push('/playlist?id=' + id)
    },
    // 跳转mv页面
    toMv (id) {
      this.$router.push('/mv?id=' + id)
    }
  },
  created () {
    this.searchmusiclist()
  }
}
</script>

<style>
</style>