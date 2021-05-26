const ip = require('internal-ip');
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

function config(environment) {

    return merge(require('./webpack.common.js')(environment), {

        'devServer': {

            'clientLogLevel': 'warning',
            'contentBase': path.resolve(__dirname, 'dist/'),
            'host': ip.v4.sync(),
            'hot': true,
            'open': false,
            'overlay': {

                'warnings': true,
                'errors': true
            },
            'port': 8888,
            'stats': {

                'all': false,
                'builtAt': true,
                'colors': true
            },
            'watchContentBase': true
        },
        'devtool': 'inline-source-map',
        'mode': 'development',
        'plugins': [

            new FriendlyErrorsWebpackPlugin(),
            new webpack.HotModuleReplacementPlugin()
        ]
    });
}

module.exports = config;
