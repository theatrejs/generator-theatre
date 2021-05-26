const merge = require('webpack-merge');

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

function config(environment) {

    return merge(require('./webpack.common.js')(environment), {

        'devtool': 'source-map',
        'mode': 'production',
        'plugins': [

            new FriendlyErrorsWebpackPlugin()
        ],
        'stats': {

            'all': false,
            'builtAt': true,
            'colors': true
        }
    });
}

module.exports = config;
