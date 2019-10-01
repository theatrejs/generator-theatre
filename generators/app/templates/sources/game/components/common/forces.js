import * as Ease from 'modules/ease.js';

function Forces(parts) {

    this.name = 'forces';

    function add(force) {

        const {easing, elapsed, ending, handling, duration, x, y} = force;

        force.x = x;
        force.y = y;
        force.duration = duration;
        force.easing = easing || Ease.linear(1);
        force.elapsed = elapsed || 0;
        force.ending = ending || false;
        force.handling = handling || false;

        force.moved = {

            'x': 0,
            'y': 0
        };

        this.parts.push(force);
    }

    this.parts = [];

    this.add = add;

    parts.forEach((force) => {

        this.add(force);
    });
}

export {Forces};
