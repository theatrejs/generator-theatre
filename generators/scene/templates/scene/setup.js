import {Camera} from 'modules/camera.js';
import {Controllers} from 'modules/controllers.js';
import {World} from 'modules/world.js';

function setup() {

    console.log('lifecycle :', 'setup <%= title %> scene');

    this.$origins = {

        'default': {

            'x': this.size.width / 2,
            'y': this.size.height / 2,
            'z': 0,
            'scale': 1
        }
    };

    this.$world = new World(this);
    this.$camera = new Camera(this.context, this.size.width, this.size.height);

    this.$controllers = new Controllers(this.element, [

        ...this.assets.datasets.common['inputs'](),
        ...this.assets.datasets.<%= title %>['inputs']()
    ]);
}

export {setup};
