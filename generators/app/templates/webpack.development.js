const merge = require('webpack-merge');
const path = require('path');

const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = merge(require('./webpack.common.js'), {

    'devServer': {

        'contentBase': path.resolve(__dirname, 'docs/'),
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

        new WebpackNotifierPlugin()
    ]
});
