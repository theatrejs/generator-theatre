function Mouse(container, inputs) {

    function contextmenu(event) {

        event.preventDefault();
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

        const rectangle = event.target.getBoundingClientRect();
        const x = event.clientX - rectangle.left;
        const y = event.clientY - rectangle.top;

        inputs.push({

            'type': 'MOUSE',
            'action': 'CLICK_' + buttons[button],
            'state': 'DOWN',
            'x': x,
            'y': y
        });

        event.preventDefault();
    }

    function mouseenter(event) {

        const rectangle = event.target.getBoundingClientRect();
        const x = event.clientX - rectangle.left;
        const y = event.clientY - rectangle.top;

        inputs.push({

            'type': 'MOUSE',
            'action': 'MOVE',
            'state': 'ENTER',
            'x': x,
            'y': y
        });

        event.preventDefault();
    }

    function mouseleave(event) {

        const rectangle = event.target.getBoundingClientRect();
        const x = event.clientX - rectangle.left;
        const y = event.clientY - rectangle.top;

        inputs.push({

            'type': 'MOUSE',
            'action': 'MOVE',
            'state': 'LEAVE',
            'x': x,
            'y': y
        });

        event.preventDefault();
    }

    function mousemove(event) {

        const rectangle = event.target.getBoundingClientRect();
        const x = event.clientX - rectangle.left;
        const y = event.clientY - rectangle.top;

        inputs.push({

            'type': 'MOUSE',
            'action': 'MOVE',
            'x': x,
            'y': y
        });

        event.preventDefault();
    }

    function mouseup(event) {

        const button = event.button;
        const buttons = ['LEFT', 'MIDDLE', 'RIGHT'];

        if (typeof buttons[button] === 'undefined') {

            return;
        }

        const rectangle = event.target.getBoundingClientRect();
        const x = event.clientX - rectangle.left;
        const y = event.clientY - rectangle.top;

        inputs.push({

            'type': 'MOUSE',
            'action': 'CLICK_' + buttons[button],
            'state': 'UP',
            'x': x,
            'y': y
        });

        event.preventDefault();
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

        const rectangle = event.target.getBoundingClientRect();
        const x = event.clientX - rectangle.left;
        const y = event.clientY - rectangle.top;

        inputs.push({

            'type': 'MOUSE',
            'action': 'SCROLL_' + (event.deltaY > 0 ? 'DOWN' : 'UP'),
            'x': x,
            'y': y
        });

        event.preventDefault();
    }

    setup.call(this);

    this.destroy = destroy;
    this.setup = setup;
}

// exports current module as an object
export {Mouse};
