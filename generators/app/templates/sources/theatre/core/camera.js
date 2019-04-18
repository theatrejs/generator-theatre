function Camera(context, width, height) {

    let images = [];

    let shaking = {

        'current': false,
        'duration': 0,
        'easing': null,
        'elapsed': 0,
        'force': {

            'x': 0,
            'y': 0
        },
        'shift': {

            'x': 0,
            'y': 0
        }
    };

    function add(image) {

        let target = 0;

        for (let iterator = images.length - 1; iterator >= 0; iterator -= 1) {

            const current = images[iterator];

            if (image.position.z >= current.position.z) {

                target = iterator + 1;

                break;
            }
        }

        images.splice(target, 0, image);
    }

    function idle() {

        shaking = {

            'current': false,
            'duration': 0,
            'easing': null,
            'elapsed': 0,
            'force': {

                'x': 0,
                'y': 0
            },
            'shift': {

                'x': 0,
                'y': 0
            }
        };
    }

    function render() {

        images.forEach((image) => {

            const {frame, position, source} = image;

            if (this.visible(position.x, position.y, frame.width, frame.height) === true) {

                context.drawImage(

                    source,
                    frame.x, frame.y, frame.width, frame.height,
                    position.x - (this.position.x + shaking.shift.x), position.y - (this.position.y + shaking.shift.y), frame.width, frame.height
                );
            }
        });

        images = [];
    }

    function set(x, y) {

        this.position.x = x;
        this.position.y = y;
    }

    function shake(force, duration, easing) {

        const {x, y} = force;

        shaking.force = {

            'x': x,
            'y': y
        };

        shaking.current = true;
        shaking.duration = duration;
        shaking.easing = easing;
    }

    function update(delta) {

        if (shaking.current === false) {

            return;
        }

        if (shaking.elapsed + delta >= shaking.duration) {

            this.idle();

            return;
        }

        shaking.elapsed += delta;

        const amplitude = shaking.easing(shaking.elapsed / shaking.duration);
        const angle = Math.random() * 2 * Math.PI;

        shaking.shift.x = Math.round(Math.cos(angle) * shaking.force.x * amplitude);
        shaking.shift.y = Math.round(Math.sin(angle) * shaking.force.y * amplitude);
    }

    function visible(x, y, width, height) {

        const camera = {

            'x': this.position.x + shaking.shift.x,
            'y': this.position.y + shaking.shift.y,
            'width': this.size.width,
            'height': this.size.height
        };

        if (x + width <= camera.x
        || x >= camera.x + camera.width
        || y + height <= camera.y
        || y >= camera.y + camera.height) {

            return false;
        }

        return true;
    }

    this.position = {

        'x': 0,
        'y': 0
    };

    this.size = {

        'width': width,
        'height': height
    };

    this.add = add;
    this.idle = idle;
    this.render = render;
    this.set = set;
    this.shake = shake;
    this.update = update;
    this.visible = visible;
}

// exports current module as an object
export {Camera};
