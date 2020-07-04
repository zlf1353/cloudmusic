<template>
  <div class="discovery-container">
    <!--轮播图-->
    <el-carousel :interval="4000"
                 type="card">
      <el-carousel-item v-for="(item,index) in banners"
                        :key="index">
        <img :src="item.imageUrl" />
      </el-carousel-item>
    </el-carousel>
    <!--<p>123</p>-->
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "discovery",
  data () {
    return {
      banners: []
    }
  },
  created () {
    // 轮播图数据
    axios({
      url: 'http://localhost:3000/banner',
      method: 'get',
      params: {}
      // eslint-disable-next-line no-unused-vars
    }).then(res => {
      //console.log(res)
      this.banners = res.data.banners
    })
  }
}
</script>

<style>
</style>