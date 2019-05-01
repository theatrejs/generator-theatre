import * as Ease from './ease.js';

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

            if (image.destination.z >= current.destination.z) {

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

            const {destination, frame, opacity, source} = image;

            if (opacity > 0
            && this.visible(destination.x, destination.y, frame.width, frame.height) === true) {

                const alpha = context.globalAlpha;

                context.globalAlpha = opacity;

                context.drawImage(

                    source,
                    frame.x, frame.y, frame.width, frame.height,
                    destination.x - (this.position.x + shaking.shift.x), destination.y - (this.position.y + shaking.shift.y), destination.width, destination.height
                );

                context.globalAlpha = alpha;
            }
        });

        images = [];
    }

    function set(x, y) {

        this.position.x = x;
        this.position.y = y;
    }

    function shake(x, y, duration, easing = Ease.reverse(Ease.easeOut(2))) {

        this.idle();

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
