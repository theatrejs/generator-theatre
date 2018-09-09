const merge = require('webpack-merge');
const SourceMapDevToolPlugin = require('webpack').SourceMapDevToolPlugin;
const WebpackNotifierPlugin = require('webpack-notifier');

const common = require('./webpack.common.js');

module.exports = merge(common, {

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
