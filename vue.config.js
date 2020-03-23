const webpack = require('webpack')

module.exports = {
  publicPath: '/vue/',
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        moment: 'moment'
      })
    ]
  }
}
