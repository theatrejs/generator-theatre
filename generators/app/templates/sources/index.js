import {Theatre} from 'core/theatre.js';

new Theatre({

    'container': document.body,
    'expose': true,
    'framerate': 60,
    'loading': 'loading',
    'opening': 'demo',
    'sharp': true,
    'size': {

        'width': 320,
        'height': 288
    }
});
