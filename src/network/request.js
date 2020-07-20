import axios from 'axios'
export function playmusic (id) {
  axios({
    url: 'http://localhost:3000/song/url',
    method: 'get',
    params: { id: id }
  }).then(res => {
    // 播放的音乐地址
    // 父组件传参
    return res
    //console.log(this.$parent.musicUrl)
  })
}
