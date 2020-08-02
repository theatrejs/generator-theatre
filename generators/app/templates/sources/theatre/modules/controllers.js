import {Gamepad} from './gamepad.js';
import {Keyboard} from './keyboard.js';
import {Mouse} from './mouse.js';

function Controllers(container, actions) {

    const controllers = [];
    const inputs = [];

    function destroy() {

        controllers.forEach((controller) => {

            controller.destroy();
        });
    }

    function setup() {

        controllers.push(new Gamepad(container, actions, inputs));
        controllers.push(new Keyboard(container, actions, inputs));
        controllers.push(new Mouse(container, actions, inputs));
    }

    setup.call(this);

    this.inputs = inputs;

    this.destroy = destroy;
}

// exports current module as an object
export {Controllers};
