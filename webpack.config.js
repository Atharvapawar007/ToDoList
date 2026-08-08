console.log("Using webpack config");

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",

  entry: "./src/index.js",

  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },

  watchOptions: {
    poll: 1000,
    ignored: /node_modules/,
  },

  devServer: {
    static: "./dist",
    open: true,
    hot: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|avif|bmp|ico|tiff?)$/i,
        type: "asset/resource",
      },
    ],
  },
};