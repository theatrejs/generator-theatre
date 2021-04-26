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

            if (opacity === 0) {

                return;
            }

            const visible = this.visible(

                destination.x * this.screen.scale(),
                destination.y * this.screen.scale(),
                destination.width * this.screen.scale(),
                destination.height * this.screen.scale()
            );

            if (visible === false) {

                return;
            }

            const alpha = context.globalAlpha;

            context.globalAlpha = opacity * this.screen.opacity;

            for (let row = 0; row < destination.height / frame.height; row += 1) {

                const height = Math.min(1, (destination.height / frame.height) - row) * frame.height;

                for (let column = 0; column < destination.width / frame.width; column += 1) {

                    const width = Math.min(1, (destination.width / frame.width) - column) * frame.width;

                    const visible = this.visible(

                        (destination.x + column * frame.width) * this.screen.scale(),
                        (destination.y + row * frame.height) * this.screen.scale(),
                        width * this.screen.scale(),
                        height * this.screen.scale()
                    );

                    if (visible === false) {

                        continue;
                    }

                    const canvas = {

                        'destination': {

                            'x': this.screen.x() + (destination.x + column * frame.width) * this.screen.scale() - (this.position.x() * this.screen.scale() - this.screen.width() / 2 + this.shaking.shift.x * this.screen.scale()),
                            'y': this.screen.y() + (destination.y + row * frame.height) * this.screen.scale() - (this.position.y() * this.screen.scale() - this.screen.height() / 2 + this.shaking.shift.y * this.screen.scale()),
                            'width': width * this.screen.scale(),
                            'height': height * this.screen.scale()
                        }
                    };

                    const offset = {

                        'top': Math.min(0, canvas.destination.y - this.screen.y()),
                        'right': Math.max(0, canvas.destination.x + canvas.destination.width - (this.screen.x() + this.screen.width())),
                        'bottom': Math.max(0, canvas.destination.y + canvas.destination.height - (this.screen.y() + this.screen.height())),
                        'left': Math.min(0, canvas.destination.x - this.screen.x())
                    };

                    const draw = {

                        'source': {

                            'x': frame.x - offset.left * (width / canvas.destination.width),
                            'y': frame.y - offset.top * (height / canvas.destination.height),
                            'width': width - offset.right * (width / canvas.destination.width) - Math.abs(offset.left * (width / canvas.destination.width)),
                            'height': height - offset.bottom * (height / canvas.destination.height) - Math.abs(offset.top * (height / canvas.destination.height))
                        },
                        'destination': {

                            'x': canvas.destination.x - offset.left,
                            'y': canvas.destination.y - offset.top,
                            'width': canvas.destination.width - offset.right - Math.abs(offset.left),
                            'height': canvas.destination.height - offset.bottom - Math.abs(offset.top)
                        }
                    };

                    context.drawImage(

                        source,
                        draw.source.x,
                        draw.source.y,
                        draw.source.width,
                        draw.source.height,
                        draw.destination.x,
                        draw.destination.y,
                        draw.destination.width,
                        draw.destination.height
                    );
                }
            }

            context.globalAlpha = alpha;
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

        if ((x + width - camera.x).toFixed(this.precision) <= 0
        || 0 >= (camera.x + camera.width - x).toFixed(this.precision)
        || (y + height - camera.y).toFixed(this.precision) <= 0
        || 0 >= (camera.y + camera.height - y).toFixed(this.precision)) {

            return false;
        }

        return true;
    }

    this.name = name;

    this.position = {

        'x': () => 0,
        'y': () => 0
    };

    this.precision = 3;

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
