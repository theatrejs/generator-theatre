import {collide} from 'modules/collide.js';
import {Point, Rectangle} from 'modules/shape.js';

function spritesheet(entities) {

    const highest = {

        'y': Number.NEGATIVE_INFINITY,
        'z': Number.NEGATIVE_INFINITY,
        'camera': null,
        'entity': null,
        'spritesheet': null
    };

    Object.entries(entities).forEach(([name, entity]) => {

        const imagesComponent = entity.get('images');

        imagesComponent.forEach((spritesheet) => {

            const camerasComponent = entity.get('cameras');
            const positionComponent = entity.get('position');

            camerasComponent.forEach((camera) => {

                const $camera = this.$[camera.$camera.name];

                const destination = {

                    'x': positionComponent.x + spritesheet.destination[0] - (spritesheet.destination[3] / 2),
                    'y': positionComponent.y + spritesheet.destination[1] - (spritesheet.destination[4] / 2),
                    'z': positionComponent.z + spritesheet.destination[2],
                    'width': spritesheet.destination[3],
                    'height': spritesheet.destination[4]
                };

                const mouse = new Point(this.$.debugging.x, this.$.debugging.y);

                const sprite = new Rectangle(

                    $camera.screen.x() + destination.x * $camera.screen.scale() - ($camera.position.x() * $camera.screen.scale() - $camera.screen.width() / 2 + $camera.shaking.shift.x * $camera.screen.scale()),
                    $camera.screen.y() + destination.y * $camera.screen.scale() - ($camera.position.y() * $camera.screen.scale() - $camera.screen.height() / 2 + $camera.shaking.shift.y * $camera.screen.scale()),
                    destination.width * $camera.screen.scale(),
                    destination.height * $camera.screen.scale()
                );

                const screen = new Rectangle(

                    $camera.screen.x(),
                    $camera.screen.y(),
                    $camera.screen.width(),
                    $camera.screen.height(),
                );

                if (typeof this.$.debugging.x === 'number'
                && typeof this.$.debugging.y === 'number'
                && (destination.z > highest.z || (destination.z === highest.z && sprite.y > highest.y))
                && collide(mouse, sprite) === true
                && collide(mouse, screen) === true) {

                    highest.y = sprite.y;
                    highest.z = destination.z;
                    highest.camera = $camera;
                    highest.entity = entity;
                    highest.spritesheet = {

                        'name': spritesheet.name,
                        'x': sprite.x,
                        'y': sprite.y,
                        'z': destination.z,
                        'width': sprite.width,
                        'height': sprite.height,
                        'reference': spritesheet
                    };
                }

                this.$.controllers.inputs.forEach((input) => {

                    if (input.type === 'MOUSE'
                    && input.action === 'CLICK_LEFT'
                    && input.state === 'DOWN') {

                        const mouse = new Point(

                            input.x,
                            input.y
                        );

                        if (collide(mouse, sprite) === true
                        && collide(mouse, screen) === true) {

                            this.$.debugging.drag = true;

                            if (entity === highest.entity) {

                                const x = $camera.position.x() + $camera.shaking.shift.x + (mouse.x - $camera.screen.x() - $camera.screen.width() / 2) / $camera.screen.scale();
                                const y = $camera.position.y() + $camera.shaking.shift.y + (mouse.y - $camera.screen.y() - $camera.screen.height() / 2) / $camera.screen.scale();

                                this.$.debugging.entity = entity;
                                this.$.debugging.shift = {

                                    'x': Math.round(x) - entity.get('position').x,
                                    'y': Math.round(y) - entity.get('position').y
                                };
                            }
                        }
                    }

                    if (input.type === 'MOUSE'
                    && input.action === 'CLICK_LEFT'
                    && input.state === 'UP') {

                        this.$.debugging.drag = false;

                        const mouse = new Point(

                            input.x,
                            input.y
                        );

                        if (collide(mouse, sprite) === true
                        && collide(mouse, screen) === true) {

                            console.log('debugging :', 'entity', '\'' + entity.name + '\'', '/' , 'spritesheet', '\'' + spritesheet.name + '\'', '/', 'camera', '\'' + $camera.name + '\'');
                            console.log(entity);
                        }
                    }

                    if (input.type === 'MOUSE'
                    && input.action === 'MOVE'
                    && input.state === 'LEAVE') {

                        this.$.debugging.drag = false;
                    }
                });
            });
        });
    });

    Object.entries(entities).forEach(([name, entity]) => {

        const imagesComponent = entity.get('images');

        imagesComponent.forEach((spritesheet) => {

            const camerasComponent = entity.get('cameras');

            camerasComponent.forEach((camera) => {

                const $camera = this.$[camera.$camera.name];

                this.$.controllers.inputs.forEach((input) => {

                    if (input.type === 'MOUSE'
                    && input.action === 'MOVE') {

                        if (this.$.debugging.drag === true
                        && typeof this.$.debugging.entity !== 'undefined') {

                            const mouse = new Point(

                                input.x,
                                input.y
                            );

                            const x = $camera.position.x() + $camera.shaking.shift.x + (mouse.x - $camera.screen.x() - $camera.screen.width() / 2) / $camera.screen.scale();
                            const y = $camera.position.y() + $camera.shaking.shift.y + (mouse.y - $camera.screen.y() - $camera.screen.height() / 2) / $camera.screen.scale();

                            this.$.debugging.entity.get('position').x = Math.round((Math.round(x) - this.$.debugging.shift.x) / 8) * 8;
                            this.$.debugging.entity.get('position').y = Math.round((Math.round(y) - this.$.debugging.shift.y) / 8) * 8;
                        }
                    }
                });
            });
        });
    });

    if (highest.entity !== null) {

        const {camera, entity, spritesheet} = highest;

        const width = 2 * camera.screen.scale();
        const size = width * 2;

        this.context.save();

        this.context.lineWidth = width;
        this.context.font = 'bold ' + size + 'px Courier New';
        this.context.textAlign = 'start';
        this.context.textBaseline = 'top';

        this.context.fillStyle = 'black';

        let layer = this.context.measureText('entity : \'' + entity.name + '\'').width;

        if (spritesheet.height >= size * 2) layer = Math.max(this.context.measureText('entity : \'' + entity.name + '\'').width, this.context.measureText('spritesheet : \'' + spritesheet.name + '\'').width);

        const alpha = this.context.globalAlpha;

        this.context.globalAlpha = 0.8;

        this.context.fillRect(spritesheet.x + spritesheet.width, spritesheet.y - size, layer + (size * 2), spritesheet.height + (size * 2));
        this.context.fillRect(spritesheet.x - size, spritesheet.y - size, spritesheet.width + size, size);
        this.context.fillRect(spritesheet.x - size, spritesheet.y, size, spritesheet.height);
        this.context.fillRect(spritesheet.x - size, spritesheet.y + spritesheet.height, spritesheet.width + size, size);

        this.context.globalAlpha = alpha;

        this.context.fillStyle = 'white';

        if (spritesheet.height >= size * 1) this.context.fillText('entity : \'' + entity.name + '\'', spritesheet.x + spritesheet.width + size, spritesheet.y + size * 0);
        if (spritesheet.height >= size * 2) this.context.fillText('spritesheet : \'' + spritesheet.name + '\'', spritesheet.x + spritesheet.width + size, spritesheet.y + size * 1);

        if (spritesheet.height >= size * 4) this.context.fillText('camera : \'' + highest.camera.name + '\'', spritesheet.x + spritesheet.width + size, spritesheet.y + size * 3);

        if (spritesheet.height >= size * 8) this.context.fillText('x : ' + entity.get('position').x + ' + ' + spritesheet.reference.destination[0], spritesheet.x + spritesheet.width + size, spritesheet.y + size * 5);
        if (spritesheet.height >= size * 8) this.context.fillText('y : ' + entity.get('position').y + ' + ' + spritesheet.reference.destination[1], spritesheet.x + spritesheet.width + size, spritesheet.y + size * 6);
        if (spritesheet.height >= size * 8) this.context.fillText('z : ' + entity.get('position').z + ' + ' + spritesheet.reference.destination[2], spritesheet.x + spritesheet.width + size, spritesheet.y + size * 7);

        this.context.restore();
    }
}

export {spritesheet};
