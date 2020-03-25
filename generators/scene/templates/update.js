import {forces} from 'systems/common/forces.js';

function update() {

    // console.log('update <%= title %> scene');

    this.$world.system(['position', 'forces'], forces);

    this.$camera.update(this.delta.update);
}

export {update};
