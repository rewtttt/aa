// postcss.config.js
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      // vw适配的标准屏幕宽度
      // 设计图750调成1倍 => 适配375px
      // 设计图640调成1倍 => 适配320px
      // 可以使用蓝狐工具进行调倍数
      viewportWidth: 375
    }
  }
}
