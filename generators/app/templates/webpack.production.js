const merge = require('webpack-merge');

const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = merge(require('./webpack.common.js'), {

    'devtool': 'source-map',
    'mode': 'production',
    'plugins': [

        new WebpackNotifierPlugin()
    ]
});
