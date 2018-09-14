const merge = require('webpack-merge');

const JavaScriptObfuscator = require('webpack-obfuscator');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

const common = require('./webpack.common.js');

module.exports = merge(common, {

    'plugins': [

        new JavaScriptObfuscator(),
        new UglifyJSPlugin(),
        new WebpackNotifierPlugin()
    ]
});
