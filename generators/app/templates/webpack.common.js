const path = require('path');

module.exports = {

    'entry': './sources/index.js',
    'mode': 'none',
    'module': {

        'rules': [

            {
                'test': /\.js$/,
                'use': [

                    {
                        'loader': 'babel-loader',
                        'options': {

                            'presets': [

                                '@babel/preset-env'
                            ]
                        }
                    }
                ]
            },
            {
                'test': /\.mp3|\.png$/,
                'use': [

                    {
                        'loader': 'url-loader'
                    }
                ]
            }
        ]
    },
    'output': {

        'path': path.resolve(__dirname, 'dist/'),
        'filename': 'index.js'
    },
    'resolve': {

        'alias': {

            'assets': path.resolve(__dirname, 'sources/game/assets/'),
            'components': path.resolve(__dirname, 'sources/game/components/'),
            'entities': path.resolve(__dirname, 'sources/game/entities/'),
            'scenes': path.resolve(__dirname, 'sources/game/scenes/'),
            'systems': path.resolve(__dirname, 'sources/game/systems/'),

            'core': path.resolve(__dirname, 'sources/theatre/core/'),
            'modules': path.resolve(__dirname, 'sources/theatre/modules/')
        }
    }
};
