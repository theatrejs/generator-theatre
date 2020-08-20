const merge = require('webpack-merge');

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = merge(require('./webpack.common.js'), {

    'devtool': 'source-map',
    'mode': 'production',
    'plugins': [

        new FriendlyErrorsWebpackPlugin()
    ]
});
