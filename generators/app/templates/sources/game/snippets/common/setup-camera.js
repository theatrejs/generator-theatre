import {Camera} from 'modules/camera.js';

export default function (type, width, height) {

    let scale = () => Math.min((this.size.width / width), (this.size.height / height));

    switch (type) {

        case 'contain-frameless':

            return new Camera(this.context, 'default', {

                'x': () => 0,
                'y': () => 0,
                'width': () => this.size.width,
                'height': () => this.size.height,
                'scale': scale
            });

        break;

        case 'contain-framed':

            return new Camera(this.context, 'default', {

                'x': () => (this.size.width - width * scale()) / 2,
                'y': () => (this.size.height - height * scale()) / 2,
                'width': () => width * scale(),
                'height': () => height * scale(),
                'scale': scale
            });

        break;

        case 'cover':

            scale = () => Math.max((this.size.width / width), (this.size.height / height));

            return new Camera(this.context, 'default', {

                'x': () => 0,
                'y': () => 0,
                'width': () => this.size.width,
                'height': () => this.size.height,
                'scale': scale
            });

        break;
    }
};
