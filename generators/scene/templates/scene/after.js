import {debug} from 'systems/common/debug.js';

function after() {

    // console.log('lifecycle :', 'after <%= title %> scene');

    // this.$world.system('debug', [], debug);

    this.$controllers.inputs.length = 0;
}

export {after};
