const path = require('path');

module.exports = {

    'entry': './sources/index.js',
    'output': {

        'path': path.resolve(__dirname, 'docs/'),
        'filename': 'index.js'
    },
    'resolve': {

        'alias': {

            'assets': path.resolve(__dirname, 'sources/game/assets/'),
            'components': path.resolve(__dirname, 'sources/game/components/'),
            'scenes': path.resolve(__dirname, 'sources/game/scenes/'),
            'systems': path.resolve(__dirname, 'sources/game/systems/'),

            'core': path.resolve(__dirname, 'sources/theatre/core/'),
            'modules': path.resolve(__dirname, 'sources/theatre/modules/')
        }
    }
};
