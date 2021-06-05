const path = require('path');
const webpack = require('webpack');

function config(environment) {

    return {

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
                    'test': /\.json$/,
                    'include': [

                        path.resolve(__dirname, 'sources/game/components')
                    ],
                    'use': [

                        {
                            'loader': path.resolve(__dirname, 'webpack/loaders/schema-loader.js'),
                            'options': {

                                'path': path.resolve(__dirname, 'schemas/components'),
                                'name': '[name]',
                                'pattern': /^(.*)$/,
                                'replacement': '$1',
                                'extension': 'js'
                            }
                        }
                    ]
                },
                {
                    'test': /\.json$/,
                    'include': [

                        path.resolve(__dirname, 'sources/game/assets/datasets')
                    ],
                    'use': [

                        {
                            'loader': path.resolve(__dirname, 'webpack/loaders/schema-loader.js'),
                            'options': {

                                'path': path.resolve(__dirname, 'schemas/datasets'),
                                'name': '[name]',
                                'pattern': /^([^-]+)-.+$/,
                                'replacement': '$1',
                                'extension': 'js'
                            }
                        }
                    ]
                },
                {
                    'test': /\.json$/,
                    'include': [

                        path.resolve(__dirname, 'sources/game/entities')
                    ],
                    'use': [

                        {
                            'loader': path.resolve(__dirname, 'webpack/loaders/schema-loader.js'),
                            'options': {

                                'path': path.resolve(__dirname, 'schemas'),
                                'name': '[name]',
                                'pattern': /^(.*)$/,
                                'replacement': 'entity',
                                'extension': 'js'
                            }
                        }
                    ]
                },
                {
                    'test': /\.json$/,
                    'include': [

                        path.resolve(__dirname, 'sources/game/pools')
                    ],
                    'use': [

                        {
                            'loader': path.resolve(__dirname, 'webpack/loaders/schema-loader.js'),
                            'options': {

                                'path': path.resolve(__dirname, 'schemas'),
                                'name': '[name]',
                                'pattern': /^(.*)$/,
                                'replacement': 'pool',
                                'extension': 'js'
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
        'plugins': [

            new webpack.DefinePlugin({

                'ENVIRONMENT.EXPOSE': JSON.stringify(typeof environment !== 'undefined' && typeof environment.EXPOSE !== 'undefined' && environment.EXPOSE === true),
                'ENVIRONMENT.DEBUG': JSON.stringify(typeof environment !== 'undefined' && typeof environment.DEBUG !== 'undefined' && environment.DEBUG === true)
            })
        ],
        'resolve': {

            'alias': {

                'assets': path.resolve(__dirname, 'sources/game/assets/'),
                'components': path.resolve(__dirname, 'sources/game/components/'),
                'entities': path.resolve(__dirname, 'sources/game/entities/'),
                'pools': path.resolve(__dirname, 'sources/game/pools/'),
                'scenes': path.resolve(__dirname, 'sources/game/scenes/'),
                'snippets': path.resolve(__dirname, 'sources/game/snippets/'),
                'systems': path.resolve(__dirname, 'sources/game/systems/'),

                'core': path.resolve(__dirname, 'sources/theatre/core/'),
                'modules': path.resolve(__dirname, 'sources/theatre/modules/')
            }
        }
    };
}

module.exports = config;
