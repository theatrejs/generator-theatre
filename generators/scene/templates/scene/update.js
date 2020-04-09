import {forces} from 'systems/common/forces.js';
import {timeout} from 'systems/common/timeout.js';

import {commands} from 'systems/<%= title %>/commands.js';

function update() {

    // console.log('lifecycle :', 'update <%= title %> scene');

    this.$world.system('timeout', ['timeout'], timeout);
    this.$world.system('commands', ['commands'], commands);
    this.$world.system('forces', ['position', 'forces'], forces);
}

export {update};
