// eslint-disable-next-line no-unused-vars
import axios from 'axios'
export default {
  async playMusic (id) {
    const res = await this.$http.post('/song/url',
      {
        params: {
          id: id
        }
      })
    console.log(res)
    return res
    /*axios({
      url: 'http://localhost:3000/song/url',
      method: 'get',
      params: { id: id }
    }).then(res => {})*/
    // 播放的音乐地址
    // 父组件传参
    /*this.tobeplayedmusic = []
    for (let i = index + 1; i < this.playlist.tracks.length; i++) {
      this.tobeplayedmusic.push(this.playlist.tracks[i].id)
    }
    this.$parent.musicUrl = res.data.data[0].url
    this.$parent.tobeplayedmusic = this.tobeplayedmusic*/
  }
}
