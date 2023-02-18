const path = require("path");

module.exports = {
  mode: "development", // 개발단계에 맞는 번들링을 제공한다.
  entry: "./src/app.ts",
  output: {
    filename: "bundle.js",
    // 상대경로말고 절대경로를 쓰는데 node.js 문법으로 써야함
    // __dirname => 디렉토리 이름
    // 여기에 webpact으로 bundling 한 파일을 넣겠다는 것
    path: path.resolve(__dirname, "dist"),
    publicPath: "dist", // npm start 를 live-server가 아닌 webpack-dev-server 로 했을때 파일에 새로 작성한 내용이 바로 반영되도록 하기위한 설정
  },
  devtool: "inline-source-map", // 브라우저에서 디버깅하기 좋게 내가 작성한 .ts 파일 그대로의 모습을 볼 수 있게 해준다.
  module: {
    rules: [
      {
        test: /\.ts$/, // .ts로 끝나는 파일들을
        use: "ts-loader", // ts loader로 잘 작동되는지 확인해라
        exclude: /node_modules/, // node_modules 파일은 빼고
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"], // .ts, .js 로 끝나는 파일 다 확인해라
  },
};
