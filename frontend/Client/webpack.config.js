const path = require('path');

module.exports = {
  entry: './src/index.jsx', // Đường dẫn đến file entry chính của ứng dụng
  output: {
    path: path.resolve(__dirname, 'dist'), // Thư mục chứa file bundle được tạo ra
    filename: 'bundle.js' // Tên file bundle
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Hỗ trợ file .jsx hoặc .js
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'] // Đảm bảo Webpack nhận diện các file .js và .jsx
  }
};
