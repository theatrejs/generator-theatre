export default function (entity, changes) {

    const state = entity.get('state').state;
    const parts = entity.get('images');

    delete parts['character-idle'];
    delete parts['character-up'];
    delete parts['character-right'];
    delete parts['character-down'];
    delete parts['character-left'];

    switch ('' + state.UP + state.RIGHT + state.DOWN + state.LEFT) {

        case '0000':

            parts['character-idle'] = {

                'type': 'datasets',
                'scope': 'demo',
                'name': 'spritesheet-character-idle'
            };

        break;

        case '1000':

            parts['character-up'] = {

                'type': 'datasets',
                'scope': 'demo',
                'name': 'spritesheet-character-up'
            };

        break;

        case '1100':
        case '0100':
        case '0110':

            parts['character-right'] = {

                'type': 'datasets',
                'scope': 'demo',
                'name': 'spritesheet-character-right'
            };

        break;

        case '0010':

            parts['character-down'] = {

                'type': 'datasets',
                'scope': 'demo',
                'name': 'spritesheet-character-down'
            };

        break;

        case '0011':
        case '0001':
        case '1001':

            parts['character-left'] = {

                'type': 'datasets',
                'scope': 'demo',
                'name': 'spritesheet-character-left'
            };

        break;
    }
};
