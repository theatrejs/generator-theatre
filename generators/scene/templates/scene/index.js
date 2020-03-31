import {destroy} from './destroy.js';
import {render} from './render.js';
import {resize} from './resize.js';
import {setup} from './setup.js';
import {start} from './start.js';
import {update} from './update.js';

if (typeof module.hot !== 'undefined') {

    module.hot.accept([

        './destroy.js',
        './render.js',
        './resize.js',
        './setup.js',
        './start.js',
        './update.js'
    ]);
}

export {destroy, render, resize, setup, start, update};
