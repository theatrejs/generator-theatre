import {Camera} from 'modules/camera.js';
import {Controllers} from 'modules/controllers.js';
import {World} from 'modules/world.js';

function setup() {

    console.log('lifecycle :', 'setup demo scene');

    this.$.controllers = new Controllers(this.element, [

        ...this.assets.datasets.demo['inputs']()
    ]);

    this.$.origin = {

        'x': () => this.size.width / 2,
        'y': () => this.size.height / 2,
        'z': () => 0,
        'scale': () => 1
    };

    this.$.camera = new Camera(this.context, () => this.size.width, () => this.size.height);
    this.$.world = new World(this, () => this.components);
}

export {setup};
