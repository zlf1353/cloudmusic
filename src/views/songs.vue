<template>
  <div class="songs-container">
    <div class="tab-bar">
      <span class="item"
            :class="{ active: tag === 0 }"
            @click="tag = 0">全部</span>
      <span class="item"
            :class="{ active: tag === 7 }"
            @click="tag = 7">华语</span>
      <span class="item"
            :class="{ active: tag === 96 }"
            @click="tag = 96">欧美</span>
      <span class="item"
            :class="{ active: tag === 8 }"
            @click="tag = 8">日本</span>
      <span class="item"
            :class="{ active: tag === 16 }"
            @click="tag = 16">韩国</span>
    </div>
    <!-- 底部的table -->
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
            v-for="(item, index) in songs"
            :key="index">
          <td>{{ index + 1 }}</td>
          <td>
            <div class="img-wrap">
              <img :src="item.album.picUrl+'?param=130y130'"
                   alt="" />
              <span class="iconfont icon-play"
                    @click="playmucic(item.id)"></span>
            </div>
          </td>
          <td>
            <div class="song-wrap">
              <div class="name-wrap">
                <span>{{ item.name }}</span>
                <span v-if="item.mvid !== 0"
                      class="iconfont icon-mv"></span>
              </div>
            </div>
          </td>
          <td>{{ item.album.artists[0].name }}</td>
          <td>{{ item.album.name }}</td>
          <td>{{ item.duration | playTimeFormat }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'songs',
  data () {
    return {
      //地区标签
      tag: 0,
      // 新歌列表
      songs: []
    }
  },
  methods: {
    //获取新歌列表
    getsonglist () {
      axios({
        url: 'http://localhost:3000/top/song',
        method: 'get',
        params: { type: this.tag }
      }).then(res => {
        //console.log(res)
        this.songs = res.data.data
      })
    },
    playmucic (id) {
      axios({
        url: 'http://localhost:3000/song/url',
        method: 'get',
        params: { id: id }
      }).then(res => {
        // 播放的音乐地址
        // 父组件传参
        //不是el-main 只要一个$parent
        this.$parent.musicUrl = res.data.data[0].url
      })
    }
  },
  watch: {
    tag () {
      this.getsonglist()
    }
  },
  created () {
    this.getsonglist()
  }
}
</script>

<style>
</style>