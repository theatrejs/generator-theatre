import {keynames} from './keynames.js';

function Keyboard(container, actions, inputs) {

    const states = {};

    function blur() {

        for (let state in states) {

            if (states.hasOwnProperty(state)
            && states[state] === true) {

                states[state] = false;

                inputs.push({

                    'type': 'KEYBOARD',
                    'action': state,
                    'state': 'UP'
                });
            }
        }
    }

    function destroy() {

        container.removeEventListener('blur', blur);
        container.removeEventListener('keydown', keydown);
        container.removeEventListener('keyup', keyup);
    }

    function keydown(event) {

        const action = 'KEY_' + keynames[event.keyCode];

        if (actions.indexOf(action) !== -1
        && states[action] === false) {

            event.preventDefault();

            states[action] = true;

            inputs.push({

                'type': 'KEYBOARD',
                'action': action,
                'state': 'DOWN'
            });
        }
    }

    function keyup(event) {

        const action = 'KEY_' + keynames[event.keyCode];

        if (actions.indexOf(action) !== -1
        && states[action] === true) {

            event.preventDefault();

            states[action] = false;

            inputs.push({

                'type': 'KEYBOARD',
                'action': action,
                'state': 'UP'
            });
        }
    }

    function setup() {

        container.addEventListener('blur', blur);
        container.addEventListener('keydown', keydown);
        container.addEventListener('keyup', keyup);
    }

    actions.forEach((action) => {

        states[action] = false;
    });

    setup.call(this);

    this.destroy = destroy;
    this.setup = setup;
}

// exports current module as an object
export {Keyboard};
