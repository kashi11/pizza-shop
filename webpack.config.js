const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/build"),
    filename: "bundle.js",
  },
  module: { 
      rules: [
          {
              test: /\.js$/,
              exclude: [/nodeModules/,/server/ ],
              use: {
                loader: "babel-loader",
              },
              
          },
          {
            test: /\.css$/i,
            exclude: [/nodeModules/,/server/ ],
            use: ["style-loader", "css-loader"],
          },
          {
            test: /\.(png|jpe?g|gif)$/i,
            exclude: [/nodeModules/,/server/ ],
            use: [
              {
                loader: 'file-loader',
              },
            ],
          },
      ] 
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
          }),
    ],
    devtool: false,
};
