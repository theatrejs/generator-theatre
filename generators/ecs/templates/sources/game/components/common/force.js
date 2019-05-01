function Force(x, y, duration, easing, ending = false) {

    this.name = 'force';

    this.duration = duration;
    this.easing = easing;
    this.elapsed = 0;
    this.ending = ending;

    this.moved = {

        'x': 0,
        'y': 0
    };

    this.x = x;
    this.y = y;
}

export {Force};
