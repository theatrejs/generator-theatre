import {Theatre} from 'core/theatre.js';

new Theatre({

    'container': document.body,
    'debug': ENVIRONMENT.DEBUG,
    'expose': ENVIRONMENT.EXPOSE,
    'framerate': 60,
    'panic': 4000,
    'sharp': true,
    'speed': 1
});
