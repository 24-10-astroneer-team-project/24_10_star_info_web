const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack'); // dotenv-webpack 추가
// npx webpack serve -- 웹팩 서버 실행.
// Ctrl + C -- 웹팩 서버 종료.

// 웹팩 설정
module.exports = {
    mode: 'development',
    entry: './src/firebase.js', // Firebase 초기화 코드가 포함된 파일
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/, // JavaScript 파일을 대상으로 babel-loader 사용
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(), // dist 폴더 정리
        new HtmlWebpackPlugin({
            template: './src/index.html', // HTML 템플릿 경로
        }),
        new Dotenv(), // dotenv-webpack 추가
    ],
    devServer: {
        static: path.join(__dirname, 'dist'), // 정적 파일 경로
        compress: true,
        port: 9999, // 개발 서버 포트
        watchFiles: ['src/**/*'], // src 폴더의 모든 파일을 감시
        hot: true,  // HMR 활성화 (페이지를 자동으로 새로고침)
        client: {
            overlay: false,  // overlay를 client 설정으로 이동
        },
    },
    optimization: {
        usedExports: false,  // 트리 셰이킹 비활성화 (모든 모듈이 번들에 포함되도록 함)
    }
};