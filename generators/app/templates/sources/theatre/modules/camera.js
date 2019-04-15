import {collide} from './collide.js';
import {Rectangle} from './shape.js';

function Camera(context, width, height) {

    let images = [];

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
            const cameraBox = new Rectangle(this.position.x, this.position.y, this.size.width, this.size.height);

            if (collide(imageBox, cameraBox) === true) {

                context.drawImage(

                    source,
                    frame.x, frame.y, frame.width, frame.height,
                    position.x - this.position.x, position.y - this.position.y, frame.width, frame.height
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
}

// exports current module as an object
export {Camera};
