const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");

// 개발모드가 아닌 프로덕션 모드로 번들링할때
module.exports = {
  mode: "production",
  entry: "./src/app.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "none",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [
    new CleanPlugin.CleanWebpackPlugin(), // 번들링해서 내보낼때 나머지는 다 지우겠다는 것
  ],
};
