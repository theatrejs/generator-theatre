import {collide} from './collide.js';
import {Rectangle} from './shape.js';

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

    function draw() {

        images.forEach((image) => {

            const {frame, position, source} = image;

            const imageBox = new Rectangle(position.x, position.y, frame.width, frame.height);
            const cameraBox = new Rectangle(this.position.x + shaking.shift.x, this.position.y + shaking.shift.y, this.size.width, this.size.height);

            if (collide(imageBox, cameraBox) === true) {

                context.drawImage(

                    source,
                    frame.x, frame.y, frame.width, frame.height,
                    position.x - (this.position.x + shaking.shift.x), position.y - (this.position.y + shaking.shift.y), frame.width, frame.height
                );
            }
        });

        images = [];
    }

    function move(x, y) {

        this.position.x += x;
        this.position.y += y;
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

            return;
        }

        shaking.elapsed += delta;

        const amplitude = shaking.easing(shaking.elapsed / shaking.duration);
        const angle = Math.random() * 2 * Math.PI;

        shaking.shift.x = Math.round(Math.cos(angle) * shaking.force.x * amplitude);
        shaking.shift.y = Math.round(Math.sin(angle) * shaking.force.y * amplitude);
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
    this.draw = draw;
    this.move = move;
    this.set = set;
    this.shake = shake;
    this.update = update;
}

// exports current module as an object
export {Camera};
