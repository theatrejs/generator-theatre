import {Camera} from 'modules/camera.js';
import {Controllers} from 'modules/controllers.js';
import {World} from 'modules/world.js';

function setup() {

    console.log('lifecycle :', 'setup <%= title %> scene');

    this.$.controllers = new Controllers(this.element, [

        ...this.assets.datasets.<%= title %>['inputs']()
    ]);

    this.$.origin = {

        'x': () => 0,
        'y': () => 0,
        'z': () => 0,
        'scale': () => 1
    };

    this.$.camera = new Camera(this.context, 'default', {

        'x': () => 0,
        'y': () => 0,
        'width': () => this.size.width,
        'height': () => this.size.height,
        'scale': () => 1
    });

    this.$.world = new World(this, () => this.components);
}

export {setup};
