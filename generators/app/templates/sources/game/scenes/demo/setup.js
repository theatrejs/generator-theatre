import {Camera} from 'modules/camera.js';
import {World} from 'modules/world.js';

function setup() {

    console.log('setup demo scene');

    this.$camera = new Camera(this.context, this.size.width, this.size.height);
    this.$world = new World(this);

    this.$zones = {

        'default': {

            'x': this.size.width / 2,
            'y': this.size.height / 2,
            'z': 0,
            'scale': 1
        }
    };
}

export {setup};
