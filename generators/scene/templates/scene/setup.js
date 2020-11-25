import {Controllers} from 'modules/controllers.js';

function setup() {

    console.log('lifecycle :', 'setup <%= title %> scene');

    this.$.controllers = new Controllers(this.element, [

        ...this.assets.datasets.debug['inputs'](),
        ...this.assets.datasets.<%= title %>['inputs']()
    ]);

    this.$.camera = this.snippets.common['setup-camera']('default', 'contain-frameless', 160, 144);
    this.$.world = this.snippets.common['setup-world']();
}

export {setup};
