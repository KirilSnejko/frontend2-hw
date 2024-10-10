const { default: merge } = require("webpack-merge");
const webpackConfig = require("./webpack.config");

module.exports = merge(webpackConfig, {
  mode: "development",
  devServer: {
    port: 9999,
    hot: true,
    open: false,
  },
});
