import * as Ease from './ease.js';

function Camera(context, $width, $height) {

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

            if (image.destination.z > current.destination.z
            || image.destination.z === current.destination.z
            && image.destination.y >= current.destination.y) {

                target = iterator + 1;

                break;
            }
        }

        images.splice(target, 0, image);
    }

    function idle() {

        this.shaking = {

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
            && this.visible(destination.x, destination.y, destination.width, destination.height) === true) {

                const alpha = context.globalAlpha;

                context.globalAlpha = opacity;

                context.drawImage(

                    source,
                    frame.x, frame.y, frame.width, frame.height,
                    destination.x - (this.position.x + this.shaking.shift.x), destination.y - (this.position.y + this.shaking.shift.y), destination.width, destination.height
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

        this.shaking.force = {

            'x': x,
            'y': y
        };

        this.shaking.current = true;
        this.shaking.duration = duration;
        this.shaking.easing = easing;
    }

    function update(delta) {

        if (this.shaking.current === false) {

            return;
        }

        if (this.shaking.elapsed + delta >= this.shaking.duration) {

            this.idle();

            return;
        }

        this.shaking.elapsed += delta;

        const amplitude = this.shaking.easing(this.shaking.elapsed / this.shaking.duration);
        const angle = Math.random() * 2 * Math.PI;

        this.shaking.shift.x = Math.round(Math.cos(angle) * this.shaking.force.x * amplitude);
        this.shaking.shift.y = Math.round(Math.sin(angle) * this.shaking.force.y * amplitude);
    }

    function visible(x, y, width, height) {

        const camera = {

            'x': this.position.x + this.shaking.shift.x,
            'y': this.position.y + this.shaking.shift.y,
            'width': this.size.$width(),
            'height': this.size.$height()
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

    this.shaking = shaking;

    this.size = {

        '$width': $width,
        '$height': $height
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
