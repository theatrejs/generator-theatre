import {Controllers} from 'modules/controllers.js';

function setup() {

    console.log('lifecycle :', 'setup demo scene');

    this.$.controllers = new Controllers(this.element, [

        ...this.assets.datasets.debug['inputs'](),
        ...this.assets.datasets.demo['inputs']()
    ]);

    this.$.camera = this.snippets.common['setup-camera']('default', 'contain-frameless', 160, 160);
    this.$.world = this.snippets.common['setup-world']();
}

export {setup};
