import {Camera} from 'modules/camera.js';

export default function (name, type, width, height, opacity) {

    let scale = () => Math.min((this.size.width / width), (this.size.height / height));

    switch (type) {

        case 'contain-frameless':

            return new Camera(this.context, name, {

                'x': () => 0,
                'y': () => 0,
                'width': () => this.size.width,
                'height': () => this.size.height,
                'scale': scale,
                'opacity': opacity
            });

        break;

        case 'contain-framed':

            return new Camera(this.context, name, {

                'x': () => (this.size.width - width * scale()) / 2,
                'y': () => (this.size.height - height * scale()) / 2,
                'width': () => width * scale(),
                'height': () => height * scale(),
                'scale': scale,
                'opacity': opacity
            });

        break;

        case 'cover':

            scale = () => Math.max((this.size.width / width), (this.size.height / height));

            return new Camera(this.context, name, {

                'x': () => 0,
                'y': () => 0,
                'width': () => this.size.width,
                'height': () => this.size.height,
                'scale': scale,
                'opacity': opacity
            });

        break;
    }
};
