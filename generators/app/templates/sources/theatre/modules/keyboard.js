import {keynames} from './keynames.js';

function Keyboard(codes, inputs) {

    const names = [];
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

        removeEventListener('blur', blur);
        removeEventListener('keydown', keydown);
        removeEventListener('keyup', keyup);
    }

    function keydown(event) {

        const code = event.keyCode;
        const index = codes.indexOf(code);

        if (index !== -1
        && states[names[index]] === false) {

            event.preventDefault();

            states[names[index]] = true;

            inputs.push({

                'type': 'KEYBOARD',
                'action': names[index],
                'state': 'DOWN'
            });
        }
    }

    function keyup(event) {

        const code = event.keyCode;
        const index = codes.indexOf(code);

        if (index !== -1
        && states[names[index]] === true) {

            event.preventDefault();

            states[names[index]] = false;

            inputs.push({

                'type': 'KEYBOARD',
                'action': names[index],
                'state': 'UP'
            });
        }
    }

    function setup() {

        addEventListener('blur', blur);
        addEventListener('keydown', keydown);
        addEventListener('keyup', keyup);
    }

    codes.forEach((code) => {

        if (typeof keynames[code] !== 'undefined') {

            const name = 'KEY_' + keynames[code];

            codes.push(code);
            names.push(name);

            states[name] = false;
        }
    });

    setup.call(this);

    this.destroy = destroy;
    this.setup = setup;
}

// exports current module as an object
export {Keyboard};
