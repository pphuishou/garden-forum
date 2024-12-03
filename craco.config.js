const path = require('path')

module.exports = {
  // webpack配置
  webpack: {
    alias: {
      // 配置别名
      '@': path.resolve(__dirname, 'src')
    }
  }
}