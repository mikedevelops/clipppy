const path = require('path');
const Html = require('webpack-html-plugin');

module.exports = {
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: 'clippy.bundle.js',
        path: path.join(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'source-map-loader',
                enforce: 'pre'
            },
            { 
                test: /\.js?$/,
                loader: 'babel-loader'
            },
            {
                test: /\.png$/,
                use: [
                  {
                    loader: 'file-loader'
                  }
                ]
              }
        ]
    },
    plugins: [
        new Html({
            template: path.join(__dirname, 'src/index.html'),
            filename: 'index.html',
            inject: 'body'
        })
    ]
}