const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  mode: 'development',
  resolve: {
    alias: {
      "@asset": path.resolve(__dirname, "src/asset"),
      "@constant": path.resolve(__dirname, "src/constant"),
      "@component": path.resolve(__dirname, "src/component"),
      "@hook": path.resolve(__dirname, "src/hook"),
      "@infra": path.resolve(__dirname, "src/infra"),
      "@page": path.resolve(__dirname, "src/page"),
      "@service": path.resolve(__dirname, "src/service"),
      "@store": path.resolve(__dirname, "src/store"),
      "@style": path.resolve(__dirname, "src/style"),
      "@type": path.resolve(__dirname, "src/type"),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'], // SVG를 React 컴포넌트로 변환
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.s[ac]ss$/i, 
        use: [
            'style-loader', 
            'css-loader',
            'sass-loader',
        ],
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
  },
};
