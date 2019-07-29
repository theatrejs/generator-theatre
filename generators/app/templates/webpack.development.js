const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = merge(require('./webpack.common.js'), {

    'devServer': {

        'clientLogLevel': 'warning',
        'contentBase': path.resolve(__dirname, 'dist/'),
        'hot': true,
        'open': true,
        'overlay': {

            'warnings': true,
            'errors': true
        },
        'port': 8888,
        'watchContentBase': true
    },
    'devtool': 'inline-source-map',
    'mode': 'development',
    'plugins': [

        new webpack.HotModuleReplacementPlugin(),
        new WebpackNotifierPlugin()
    ]
});
