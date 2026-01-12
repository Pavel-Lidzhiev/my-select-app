const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");

dotenv.config();

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  mode: isProd ? "production" : "development",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "../server/public"),
    filename: isProd ? "bundle.[contenthash].js" : "bundle.js",
    clean: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      minify: isProd
        ? {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
          }
        : false,
    }),
    new webpack.DefinePlugin({
      "process.env.API_URL": JSON.stringify(process.env.API_URL || ""),
    }),
    ...(isProd
      ? [new MiniCssExtractPlugin({ filename: "styles.[contenthash].css" })]
      : []),
  ],
  devtool: isProd ? false : "eval-source-map",
  devServer: !isProd
    ? {
        port: 3000,
        hot: true,
        historyApiFallback: true,
        static: {
          directory: path.resolve(__dirname, "public"),
        },
        proxy: [
          {
            context: ["/options/for/select", "/selected/option"],
            target: "http://localhost:5000",
            changeOrigin: true,
          },
        ],
      }
    : undefined,
  stats: "minimal",
};
