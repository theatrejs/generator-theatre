function Mouse(container, actions, inputs) {

    function contextmenu(event) {

        const action = 'CLICK_RIGHT';

        if (actions.indexOf(action) !== -1) {

            event.preventDefault();
        }
    }

    function destroy() {

        container.removeEventListener('contextmenu', contextmenu);
        container.removeEventListener('mousedown', mousedown);
        container.removeEventListener('mouseenter', mouseenter);
        container.removeEventListener('mouseleave', mouseleave);
        container.removeEventListener('mousemove', mousemove);
        container.removeEventListener('mouseup', mouseup);
        container.removeEventListener('wheel', wheel);
    }

    function mousedown(event) {

        const button = event.button;
        const buttons = ['LEFT', 'MIDDLE', 'RIGHT'];

        if (typeof buttons[button] === 'undefined') {

            return;
        }

        const action = 'CLICK_' + buttons[button];

        if (actions.indexOf(action) !== -1) {

            event.preventDefault();

            const rectangle = event.target.getBoundingClientRect();
            const x = event.clientX - rectangle.left;
            const y = event.clientY - rectangle.top;

            inputs.push({

                'type': 'MOUSE',
                'action': action,
                'state': 'DOWN',
                'x': x,
                'y': y
            });
        }
    }

    function mouseenter(event) {

        const action = 'MOVE';

        if (actions.indexOf(action) !== -1) {

            event.preventDefault();

            const rectangle = event.target.getBoundingClientRect();
            const x = event.clientX - rectangle.left;
            const y = event.clientY - rectangle.top;

            inputs.push({

                'type': 'MOUSE',
                'action': action,
                'state': 'ENTER',
                'x': x,
                'y': y
            });
        }
    }

    function mouseleave(event) {

        const action = 'MOVE';

        if (actions.indexOf(action) !== -1) {

            event.preventDefault();

            const rectangle = event.target.getBoundingClientRect();
            const x = event.clientX - rectangle.left;
            const y = event.clientY - rectangle.top;

            inputs.push({

                'type': 'MOUSE',
                'action': action,
                'state': 'LEAVE',
                'x': x,
                'y': y
            });
        }
    }

    function mousemove(event) {

        const action = 'MOVE';

        if (actions.indexOf(action) !== -1) {

            event.preventDefault();

            const rectangle = event.target.getBoundingClientRect();
            const x = event.clientX - rectangle.left;
            const y = event.clientY - rectangle.top;

            inputs.push({

                'type': 'MOUSE',
                'action': action,
                'x': x,
                'y': y
            });
        }
    }

    function mouseup(event) {

        const button = event.button;
        const buttons = ['LEFT', 'MIDDLE', 'RIGHT'];

        if (typeof buttons[button] === 'undefined') {

            return;
        }

        const action = 'CLICK_' + buttons[button];

        if (actions.indexOf(action) !== -1) {

            event.preventDefault();

            const rectangle = event.target.getBoundingClientRect();
            const x = event.clientX - rectangle.left;
            const y = event.clientY - rectangle.top;

            inputs.push({

                'type': 'MOUSE',
                'action': action,
                'state': 'UP',
                'x': x,
                'y': y
            });
        }
    }

    function setup() {

        container.addEventListener('contextmenu', contextmenu);
        container.addEventListener('mousedown', mousedown);
        container.addEventListener('mouseenter', mouseenter);
        container.addEventListener('mouseleave', mouseleave);
        container.addEventListener('mousemove', mousemove);
        container.addEventListener('mouseup', mouseup);
        container.addEventListener('wheel', wheel);
    }

    function wheel(event) {

        const action = 'SCROLL';

        if (actions.indexOf(action) !== -1) {

            event.preventDefault();

            const rectangle = event.target.getBoundingClientRect();
            const x = event.clientX - rectangle.left;
            const y = event.clientY - rectangle.top;

            let state;

            if (Math.abs(event.deltaY) >= Math.abs(event.deltaX)) {

                state = 'DOWN';

                if (event.deltaY < 0) {

                    state = 'UP';
                }
            }

            else {

                state = 'RIGHT';

                if (event.deltaX < 0) {

                    state = 'LEFT';
                }
            }

            inputs.push({

                'type': 'MOUSE',
                'action': action,
                'state': state,
                'x': x,
                'y': y
            });
        }
    }

    setup.call(this);

    this.destroy = destroy;
    this.setup = setup;
}

// exports current module as an object
export {Mouse};
