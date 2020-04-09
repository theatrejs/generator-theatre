import {inputs} from 'systems/common/inputs.js';

function before() {

    // console.log('lifecycle :', 'before demo scene');

    this.$controllers.inputs.forEach((input) => {

        // console.log('debugging :', input);
    });

    this.$world.system('inputs', ['inputs'], inputs);
}

export {before};
