module.exports = {
  //webpack配置
  configureWebpack: {
    //错误原因，资源(asset)和入口起点超过指定文件限制，需要在 vue.config.js 文件内做如下配置：
    //警告 webpack 的性能提示
    performance: {
      hints: 'warning',
      //入口起点的最大体积
      maxEntrypointSize: 50000000,
      //生成文件的最大体积
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js');
      }
    }
  }
}