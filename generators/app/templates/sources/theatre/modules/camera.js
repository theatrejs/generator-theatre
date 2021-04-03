import * as Ease from './ease.js';

function Camera(context, name, screen) {

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

    function clean() {

        images = [];
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

    function look(x, y) {

        this.position.x = x;
        this.position.y = y;
    }

    function render() {

        if (this.screen.opacity === 0) {

            return;
        }

        images.forEach((image) => {

            const {destination, frame, opacity, source} = image;

            const visible = this.visible(

                destination.x * this.screen.scale(),
                destination.y * this.screen.scale(),
                destination.width * this.screen.scale(),
                destination.height * this.screen.scale()
            );

            if (opacity > 0
            && visible === true) {

                const alpha = context.globalAlpha;

                context.globalAlpha = opacity * this.screen.opacity;

                const canvas = {

                    'destination': {

                        'x': this.screen.x() + destination.x * this.screen.scale() - (this.position.x() * this.screen.scale() - this.screen.width() / 2 + this.shaking.shift.x * this.screen.scale()),
                        'y': this.screen.y() + destination.y * this.screen.scale() - (this.position.y() * this.screen.scale() - this.screen.height() / 2 + this.shaking.shift.y * this.screen.scale()),
                        'width': destination.width * this.screen.scale(),
                        'height': destination.height * this.screen.scale()
                    }
                };

                const offset = {

                    'top': Math.min(0, canvas.destination.y - this.screen.y()),
                    'right': Math.max(0, canvas.destination.x + canvas.destination.width - (this.screen.x() + this.screen.width())),
                    'bottom': Math.max(0, canvas.destination.y + canvas.destination.height - (this.screen.y() + this.screen.height())),
                    'left': Math.min(0, canvas.destination.x - this.screen.x())
                };

                context.drawImage(

                    source,
                    frame.x - offset.left * (frame.width / canvas.destination.width),
                    frame.y - offset.top * (frame.height / canvas.destination.height),
                    frame.width - offset.right * (frame.width / canvas.destination.width) - Math.abs(offset.left * (frame.width / canvas.destination.width)),
                    frame.height - offset.bottom * (frame.height / canvas.destination.height) - Math.abs(offset.top * (frame.height / canvas.destination.height)),
                    canvas.destination.x - offset.left,
                    canvas.destination.y - offset.top,
                    canvas.destination.width - offset.right - Math.abs(offset.left),
                    canvas.destination.height - offset.bottom - Math.abs(offset.top)
                );

                context.globalAlpha = alpha;
            }
        });
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

            'x': this.position.x() * this.screen.scale() - this.screen.width() / 2 + this.shaking.shift.x * this.screen.scale(),
            'y': this.position.y() * this.screen.scale() - this.screen.height() / 2 + this.shaking.shift.y * this.screen.scale(),
            'width': this.screen.width(),
            'height': this.screen.height()
        };

        if (x + width <= camera.x
        || x >= camera.x + camera.width
        || y + height <= camera.y
        || y >= camera.y + camera.height) {

            return false;
        }

        return true;
    }

    this.name = name;

    this.position = {

        'x': () => 0,
        'y': () => 0
    };

    this.screen = {

        'x': screen.x,
        'y': screen.y,
        'width': screen.width,
        'height': screen.height,
        'scale': screen.scale,
        'opacity': screen.opacity
    };

    this.shaking = shaking;

    this.add = add;
    this.clean = clean;
    this.idle = idle;
    this.look = look;
    this.render = render;
    this.shake = shake;
    this.update = update;
    this.visible = visible;
}

// exports current module as an object
export {Camera};
