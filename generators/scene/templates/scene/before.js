import {inputs} from 'systems/common/inputs.js';

function before() {

    // console.log('lifecycle :', 'before <%= title %> scene');

    this.$controllers.inputs.forEach((input) => {

        // console.log('debugging :', input);
    });

    this.$world.system('inputs', ['inputs'], inputs);
}

export {before};
