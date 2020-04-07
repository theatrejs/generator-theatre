import {forces} from 'systems/common/forces.js';
import {inputs} from 'systems/common/inputs.js';
import {timeout} from 'systems/common/timeout.js';

import {commands} from 'systems/<%= title %>/commands.js';

function update() {

    // console.log('update <%= title %> scene');

    this.$world.system(['inputs'], inputs);
    this.$world.system('commands', ['commands'], commands);
    this.$world.system('timeout', ['timeout'], timeout);
    this.$world.system('forces', ['position', 'forces'], forces);

    this.$camera.update(this.delta.update);
}

export {update};