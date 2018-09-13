const path = require('path');

const merge = require('webpack-merge');
const SourceMapDevToolPlugin = require('webpack').SourceMapDevToolPlugin;
const WebpackNotifierPlugin = require('webpack-notifier');

const common = require('./webpack.common.js');

module.exports = merge(common, {

    'devServer': {

        'contentBase': path.resolve(__dirname, 'docs/'),
        'open': true,
        'overlay': {

            'warnings': true,
            'errors': true
        },
        'port': 9000,
        'watchContentBase': true
    },
    'mode': 'none',
    'module': {

        'rules': [

            {
                'test': /\.ogg|\.png|\.wav$/,
                'use': [

                    {'loader': 'url-loader'}
                ]
            }
        ]
    },
    'plugins': [

        new SourceMapDevToolPlugin(),
        new WebpackNotifierPlugin()
    ]
});
