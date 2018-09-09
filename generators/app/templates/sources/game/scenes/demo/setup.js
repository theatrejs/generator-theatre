import {Keyboard} from 'modules/keyboard.js';
import {DOWN, LEFT, RIGHT, UP} from 'modules/keycodes.js';
import {System} from 'modules/world.js';

import {animate} from 'systems/demo/animate.js';
import {framerate} from 'systems/demo/framerate.js';
import {image} from 'systems/demo/image.js';
import {input} from 'systems/demo/input.js';
import {reframe} from 'systems/demo/reframe.js';
import {text} from 'systems/demo/text.js';

function setup() {

    console.log('setup demo scene');

    this.inputs = [];

    this.keyboard = new Keyboard([UP, RIGHT, DOWN, LEFT], this.inputs);

    this.systems = {

        'framerate': new System(['framerate'], framerate.bind(this)),
        'image': new System(['image', 'position'], image.bind(this)),
        'text': new System(['alphabet', 'position'], text.bind(this)),

        'animate': new System(['animation'], animate.bind(this)),
        'input': new System(['input'], input.bind(this)),
        'reframe': new System(['animation', 'image'], reframe.bind(this))
    };
}

export {setup};
