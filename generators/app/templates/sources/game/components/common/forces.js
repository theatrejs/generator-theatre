function Forces(parts) {

    this.name = 'forces';

    function add(force) {

        const {$easing, elapsed, $ending, $handling, duration, x, y} = force;

        force.x = x || 0;
        force.y = y || 0;
        force.duration = duration;
        force.$easing = $easing || false;
        force.elapsed = elapsed || 0;
        force.$ending = $ending || false;
        force.$handling = $handling || false;

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
