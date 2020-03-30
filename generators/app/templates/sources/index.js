import * as scenes from 'scenes/index.js';

import {Theatre} from 'core/theatre.js';

new Theatre({

    'container': document.body,
    'expose': true,
    'scenes': scenes,
    'sharp': true
});
