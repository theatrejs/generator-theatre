const ip = require('internal-ip');
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = merge(require('./webpack.common.js'), {

    'devServer': {

        'clientLogLevel': 'warning',
        'contentBase': path.resolve(__dirname, 'dist/'),
        'host': ip.v4.sync(),
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

        new FriendlyErrorsWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
});
