<template>
  <div class="playlist-container">
    <!-- 顶部 -->
    <div class="top-wrap">
      <div class="img-wrap">
        <!-- 封面 -->
        <img :src="perinfo.profile.avatarUrl"
             alt="" />
      </div>
      <div class="info-wrap">
        <!-- 名字 -->
        <p class="title">{{ perinfo.profile.nickname}}</p>
        <div class="author-wrap">
          <!-- 名字 -->
          <span class="name">{{ perinfo.profile.follows }}</span>
          <!-- 时间 -->
          <span class="time">{{ perinfo.profile.createTime | dateFormat }}</span>
        </div>
        <div class="desc-wrap">
          <span class="title">{{perinfo.bindings[1].url}}</span>
          <span class="desc"></span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "personalinfo",
  data () {
    return {
      perinfo: []
    }
  },
  methods: {
    async getinfo () {
      const { data: res } = await this.$http.get('/user/detail', {
        params: {
          cookie: document.cookie,
          uid: window.sessionStorage.getItem('uid')
        }
      })
      this.perinfo = res
      console.log(this.perinfo.profile.avatarUrl)
    }
  },
  created () {
    this.getinfo()
  }
}

</script>

<style>
</style>