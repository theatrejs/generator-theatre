function Gamepad(container, actions, inputs) {

    const states = {};

    let id = null;

    function act(action, state) {

        states[action] = state;

        inputs.push({

            'type': 'GAMEPAD',
            'action': action,
            'state': (state === true ? 'DOWN' : 'UP')
        });
    }

    function blur() {

        for (let state in states) {

            if (states.hasOwnProperty(state)
            && states[state] === true) {

                states[state] = false;

                inputs.push({

                    'type': 'GAMEPAD',
                    'action': state,
                    'state': 'UP'
                });
            }
        }
    }

    function destroy() {

        window.cancelAnimationFrame(id);
    }

    function setup() {

        id = window.requestAnimationFrame(update.bind(this));
    }

    function update() {

        const gamepads = navigator.getGamepads() || [];

        if (typeof gamepads[0] !== 'undefined'
        && gamepads[0] !== null
        && document.hasFocus() === true) {

            const gamepad = gamepads[0];

            const buttons = [

                [0, 'A'],
                [1, 'B'],
                [2, 'X'],
                [3, 'Y'],
                [4, 'LB'],
                [5, 'RB'],
                [6, 'LT'],
                [7, 'RT'],
                [8, 'BACK'],
                [9, 'START'],
                [10, 'LSB'],
                [11, 'RSB'],
                [12, 'UP'],
                [13, 'DOWN'],
                [14, 'LEFT'],
                [15, 'RIGHT']
            ];

            buttons.forEach(([code, name]) => {

                const action = 'GAMEPAD_' + name;

                if (actions.indexOf(action) !== -1
                && gamepad.buttons[code].pressed === true
                && states[action] === false) {

                    act(action, true);
                }

                else if (actions.indexOf(action) !== -1
                && gamepad.buttons[code].pressed === false
                && states[action] === true) {

                    act(action, false);
                }
            });

            const sticks = [

                [0, ['LS_LEFT', 'LS_RIGHT']],
                [1, ['LS_UP', 'LS_DOWN']],
                [2, ['RS_LEFT', 'RS_RIGHT']],
                [3, ['RS_UP', 'RS_DOWN']]
            ];

            sticks.forEach(([code, [negative, positive]]) => {

                if (gamepad.axes[code] <= -0.5) {

                    const action = 'GAMEPAD_' + negative;

                    if (actions.indexOf(action) !== -1
                    && states[action] === false) {

                        act(action, true);
                    }
                }

                else if (gamepad.axes[code] > -0.5) {

                    const action = 'GAMEPAD_' + negative;

                    if (actions.indexOf(action) !== -1
                    && states[action] === true) {

                        act(action, false);
                    }
                }

                if (gamepad.axes[code] >= 0.5) {

                    const action = 'GAMEPAD_' + positive;

                    if (actions.indexOf(action) !== -1
                    && states[action] === false) {

                        act(action, true);
                    }
                }

                else if (gamepad.axes[code] < 0.5) {

                    const action = 'GAMEPAD_' + positive;

                    if (actions.indexOf(action) !== -1
                    && states[action] === true) {

                        act(action, false);
                    }
                }
            });
        }

        else if (document.hasFocus() === false
        || gamepads.length === 0) {

            blur();
        }

        id = window.requestAnimationFrame(update.bind(this));
    }

    actions.forEach((action) => {

        states[action] = false;
    });

    setup.call(this);

    this.destroy = destroy;
    this.setup = setup;
}

// exports current module as an object
export {Gamepad};
