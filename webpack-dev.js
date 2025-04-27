const path = require("path");
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack-common.js");

const devConfig = {
  mode: "development",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "./public"),
    },
    port: 3000,
    compress: true,
    open: true,
    hot: true,
    historyApiFallback: true,
  },
};

module.exports = merge(devConfig, commonConfig);
