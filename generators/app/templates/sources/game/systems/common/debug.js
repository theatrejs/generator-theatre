import {collide} from 'modules/collide.js';
import {Point, Rectangle} from 'modules/shape.js';

function debug(entities) {

    this.$controllers.inputs.forEach((input) => {

        if (input.type === 'KEYBOARD'
        && input.action === 'KEY_SPACE'
        && input.state === 'DOWN') {

            if (this.playing === false) {

                console.log('debugging :', 'play game');

                this.play();
            }

            else if (this.playing === true) {

                console.log('debugging :', 'pause game');

                this.pause();
            }
        }

        else if (input.type === 'KEYBOARD'
        && input.action === 'KEY_ENTER'
        && input.state === 'DOWN') {

            console.log('debugging :', 'tick game');

            this.tick();
        }
    });

    Object.entries(entities).forEach(([name, entity]) => {

        this.$controllers.inputs.forEach((input) => {

            if (input.type === 'MOUSE'
            && input.action === 'CLICK_LEFT'
            && input.state === 'DOWN'
            && entity.has(['camera', 'images', 'origin', 'position']) === true) {

                const cameraComponent = entity.get('camera');
                const imagesComponent = entity.get('images');
                const originComponent = entity.get('origin');
                const positionComponent = entity.get('position');

                imagesComponent.parts.forEach((part) => {

                    const {destination} = part;

                    const mouse = new Point(

                        input.x,
                        input.y
                    );

                    const image = new Rectangle(

                        Math.floor((positionComponent.x + destination[0]) * originComponent.reference.scale + originComponent.reference.x) - (cameraComponent.camera.position.x + cameraComponent.camera.shaking.shift.x),
                        Math.floor((positionComponent.y + destination[1]) * originComponent.reference.scale + originComponent.reference.y) - (cameraComponent.camera.position.y + cameraComponent.camera.shaking.shift.y),
                        (destination[3] * originComponent.reference.scale),
                        (destination[4] * originComponent.reference.scale)
                    );

                    if (collide(mouse, image)) {

                        console.log('debugging :', 'image', '\'' + part.name + '\'');
                        console.log('debugging :', 'entity', '\'' + entity.name + '\'');
                        console.log(entity);
                    }
                });
            }
        });
    });
}

export {debug};
