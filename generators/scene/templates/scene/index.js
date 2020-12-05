import {after} from './after.js';
import {before} from './before.js';
import {destroy} from './destroy.js';
import {panic} from './panic.js';
import {render} from './render.js';
import {resize} from './resize.js';
import {setup} from './setup.js';
import {start} from './start.js';
import {update} from './update.js';

if (typeof module.hot !== 'undefined') {

    module.hot.accept([

        './after.js',
        './before.js',
        './destroy.js',
        './panic.js',
        './render.js',
        './resize.js',
        './setup.js',
        './start.js',
        './update.js'
    ]);
}

export {after, before, destroy, panic, render, resize, setup, start, update};
