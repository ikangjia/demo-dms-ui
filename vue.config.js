const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: 'localhost',
    port: 8080,
    https: false,
    open: true,
    hot: true,

    proxy: {
      '/api': {
        target: 'http://localhost:9002',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})
