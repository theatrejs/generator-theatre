import {assets} from 'assets/index.js';
import * as scenes from 'scenes/index.js';

import {Theatre} from 'core/theatre.js';

new Theatre({

    'assets': assets,
    'container': document.body,
    'expose': true,
    'framerate': 60,
    'scenes': scenes,
    'sharp': true,
    'size': {

        'width': 320,
        'height': 288
    }
});
