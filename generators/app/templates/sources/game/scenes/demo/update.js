import {fade} from 'systems/common/fade.js';
import {forces} from 'systems/common/forces.js';
import {spritesheets} from 'systems/common/spritesheets.js';
import {timeout} from 'systems/common/timeout.js';

import {commands} from 'systems/demo/commands.js';

function update() {

    // console.log('lifecycle :', 'update demo scene');

    this.$world.system('timeout', ['timeout'], timeout);
    this.$world.system('commands', ['commands'], commands);
    this.$world.system('forces', ['position', 'forces'], forces);
    this.$world.system('fade', ['camera', 'fade'], fade);
    this.$world.system('spritesheets', ['images'], spritesheets);

    this.$camera.update(this.delta.update);
}

export {update};
