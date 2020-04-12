import {collide} from 'modules/collide.js';
import {Point, Rectangle} from 'modules/shape.js';

function debug(entities) {

    this.$controllers.inputs.forEach((input) => {

        if (input.type === 'KEYBOARD'
        && input.action === 'KEY_SPACE'
        && input.state === 'DOWN') {

            if (this.playing === false) {

                console.log('debugging :', 'play game', '(' + this.loop.framerate + 'fps @' + this.loop.speed + 'x)');

                this.play();
            }

            else if (this.playing === true) {

                console.log('debugging :', 'pause game', '(' + this.loop.framerate + 'fps @' + this.loop.speed + 'x)');

                this.pause();
            }
        }

        else if (input.type === 'KEYBOARD'
        && input.action === 'KEY_ENTER'
        && input.state === 'DOWN') {

            console.log('debugging :', 'tick game', '(' + (Math.round(this.delta.update * 100) / 100) + 'ms @' + this.loop.speed + 'x)');

            this.tick();
        }

        else if (input.type === 'KEYBOARD'
        && input.action === 'KEY_SHIFT'
        && input.state === 'DOWN') {

            this.state.debugging = true;
        }

        else if (input.type === 'KEYBOARD'
        && input.action === 'KEY_SHIFT'
        && input.state === 'UP') {

            delete this.state.debugging;
        }
    });

    Object.entries(entities).forEach(([name, entity]) => {

        if (entity.has(['camera', 'images', 'origin', 'position']) === true) {

            const cameraComponent = entity.get('camera');
            const imagesComponent = entity.get('images');
            const originComponent = entity.get('origin');
            const positionComponent = entity.get('position');

            imagesComponent.parts.forEach((part) => {

                const {destination} = part;

                const image = new Rectangle(

                    Math.floor((positionComponent.x + destination[0]) * originComponent.reference.scale + originComponent.reference.x) - (cameraComponent.camera.position.x + cameraComponent.camera.shaking.shift.x),
                    Math.floor((positionComponent.y + destination[1]) * originComponent.reference.scale + originComponent.reference.y) - (cameraComponent.camera.position.y + cameraComponent.camera.shaking.shift.y),
                    (destination[3] * originComponent.reference.scale),
                    (destination[4] * originComponent.reference.scale)
                );

                if (this.state.debugging === true) {

                    this.context.save();

                    const width = 2;
                    const offset = width / 2;

                    this.context.lineWidth = width;
                    this.context.font = 'bold 16px Courier New';
                    this.context.textAlign = 'start';
                    this.context.textBaseline = 'top';

                    this.context.strokeStyle = 'black';
                    this.context.globalAlpha = .2;
                    this.context.strokeRect(image.x + offset + 0, 2 + image.y + offset, image.width - width, image.height - width);
                    this.context.fillStyle = 'black';
                    this.context.fillText('entity \'' + entity.name + '\'', image.x + image.width + 4 + 0, 2 + image.y);
                    this.context.fillText('spritesheet \'' + part.name + '\'', image.x + image.width + 4 + 0, 2 + image.y + 16);
                    this.context.fillText('frame #' + (part.frame + 1), image.x + image.width + 4 + 0, 2 + image.y + 16 * 2);
                    this.context.fillText(part.framerate + 'fps', image.x + image.width + 4 + 0, 2 + image.y + 16 * 3);

                    this.context.strokeStyle = 'white';
                    this.context.globalAlpha = 1;
                    this.context.strokeRect(image.x + offset, image.y + offset, image.width - width, image.height - width);
                    this.context.fillStyle = 'white';
                    this.context.fillText('entity \'' + entity.name + '\'', image.x + image.width + 4, image.y);
                    this.context.fillText('spritesheet \'' + part.name + '\'', image.x + image.width + 4, image.y + 16);
                    this.context.fillText('frame #' + (part.frame + 1), image.x + image.width + 4, image.y + 16 * 2);
                    this.context.fillText(part.framerate + 'fps', image.x + image.width + 4, image.y + 16 * 3);

                    this.context.restore();
                }

                this.$controllers.inputs.forEach((input) => {

                    if (input.type === 'MOUSE'
                    && input.action === 'CLICK_LEFT'
                    && input.state === 'DOWN') {

                        const mouse = new Point(

                            input.x,
                            input.y
                        );

                        if (collide(mouse, image)) {

                            console.log('debugging :', 'spritesheet', '\'' + part.name + '\'', '(frame #' + (part.frame + 1) + ')');
                            console.log(part);
                            console.log('debugging :', 'entity', '\'' + entity.name + '\'');
                            console.log(entity);
                        }
                    }
                });
            });
        }
    });

    if (this.playing === false) {

        this.context.save();

        const width = 8;
        const offset = width / 2;

        this.context.lineWidth = width;

        this.context.strokeStyle = 'black';
        this.context.globalAlpha = .2;

        this.context.beginPath();
        this.context.moveTo(32 + offset, 2 + 32);
        this.context.lineTo(32 + offset, 2 + 32 + 32);
        this.context.moveTo(32 + offset + 16, 2 + 32);
        this.context.lineTo(32 + offset + 16, 2 + 32 + 32);
        this.context.stroke();

        this.context.strokeStyle = 'white';
        this.context.globalAlpha = 1;

        this.context.beginPath();
        this.context.moveTo(32 + offset, 32);
        this.context.lineTo(32 + offset, 32 + 32);
        this.context.moveTo(32 + offset + 16, 32);
        this.context.lineTo(32 + offset + 16, 32 + 32);
        this.context.stroke();

        this.context.restore();
    }
}

export {debug};
