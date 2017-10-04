const path = require('path');
const Html = require('webpack-html-plugin');

module.exports = {
    entry: {
        'clippy': path.join(__dirname, 'src/Clippy.ts'),
        'example': path.join(__dirname, 'src/example.ts')
    },
    output: {
        filename: '[name].bundle.js',
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
                test: /\.ts?$/,
                loader: 'ts-loader'
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
