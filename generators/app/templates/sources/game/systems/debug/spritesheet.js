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

        Object.entries(imagesComponent).forEach(([name, $spritesheet]) => {

            if (typeof $spritesheet.cache === 'undefined') {

                $spritesheet.cache = this[$spritesheet.type][$spritesheet.scope][$spritesheet.name]();
            }

            const spritesheet = $spritesheet.cache;

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
                && (destination.z >= highest.z)
                && collide(mouse, sprite) === true
                && collide(mouse, screen) === true) {

                    highest.y = sprite.y;
                    highest.z = destination.z;
                    highest.camera = $camera;
                    highest.entity = entity;
                    highest.spritesheet = {

                        'name': name,
                        'x': sprite.x,
                        'y': sprite.y,
                        'z': destination.z,
                        'width': sprite.width,
                        'height': sprite.height,
                        'reference': spritesheet
                    };
                }

                this.$.controllers.inputs.forEach((input) => {

                    if (input.action === 'MOUSE_LEFT'
                    && input.state === 'DOWN') {

                        const mouse = new Point(

                            input.x,
                            input.y
                        );

                        if (collide(mouse, sprite) === true
                        && collide(mouse, screen) === true) {

                            this.$.debugging.drag = $camera;

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

                    if (input.action === 'MOUSE_LEFT'
                    && input.state === 'UP') {

                        this.$.debugging.drag = false;
                    }

                    if (input.action === 'MOUSE_RIGHT'
                    && input.state === 'DOWN') {

                        const mouse = new Point(

                            input.x,
                            input.y
                        );

                        if (collide(mouse, sprite) === true
                        && collide(mouse, screen) === true) {

                            console.log('debugging :', 'entity', '\'' + entity.name + '\'', '/' , 'spritesheet', '\'' + name + '\'', '/', 'camera', '\'' + $camera.name + '\'');
                            console.log(entity);
                        }
                    }

                    if (input.action === 'MOUSE_MOVE'
                    && input.state === 'LEAVE') {

                        this.$.debugging.drag = false;
                    }
                });
            });
        });
    });

    Object.entries(entities).forEach(([name, entity]) => {

        const imagesComponent = entity.get('images');

        Object.entries(imagesComponent).forEach(([name, $spritesheet]) => {

            const spritesheet = $spritesheet.cache || ($spritesheet.cache = this[$spritesheet.type][$spritesheet.scope][$spritesheet.name]());

            const camerasComponent = entity.get('cameras');

            camerasComponent.forEach((camera) => {

                const $camera = this.$[camera.$camera.name];

                this.$.controllers.inputs.forEach((input) => {

                    if (input.action === 'MOUSE_MOVE') {

                        if (this.$.debugging.drag === $camera
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

        const {entity, spritesheet} = highest;

        const camerasComponent = entity.get('cameras');

        camerasComponent.forEach((camera) => {

            const $camera = this.$[camera.$camera.name];

            const width = 2 * $camera.screen.scale();
            const size = width * 2;

            const center = new Rectangle(

                $camera.screen.x() + entity.get('position').x * $camera.screen.scale() - ($camera.position.x() * $camera.screen.scale() - $camera.screen.width() / 2 + $camera.shaking.shift.x * $camera.screen.scale()) - width / 2,
                $camera.screen.y() + entity.get('position').y * $camera.screen.scale() - ($camera.position.y() * $camera.screen.scale() - $camera.screen.height() / 2 + $camera.shaking.shift.y * $camera.screen.scale()) - width / 2,
                width,
                width
            );

            this.context.save();

            this.context.fillStyle = 'black';
            this.context.fillRect(center.x - 1 * $camera.screen.scale(), center.y, center.width + 2 * $camera.screen.scale(), center.height);
            this.context.fillRect(center.x, center.y - 1 * $camera.screen.scale(), center.width, center.height + 2 * $camera.screen.scale());

            this.context.fillStyle = 'rgba(217, 87, 99, 1)';
            this.context.fillRect(center.x, center.y, center.width, center.height);

            this.context.lineWidth = width;
            this.context.font = 'bold ' + size + 'px Courier New';
            this.context.textAlign = 'start';
            this.context.textBaseline = 'top';

            this.context.fillStyle = 'black';

            const lines = [

                'entity : \'' + entity.name + '\'',
                'spritesheet : \'' + spritesheet.name + '\'',
                '',
                'camera : \'' + highest.camera.name + '\'',
                '',
                'x : ' + entity.get('position').x + ' + ' + spritesheet.reference.destination[0],
                'y : ' + entity.get('position').y + ' + ' + spritesheet.reference.destination[1],
                'z : ' + entity.get('position').z + ' + ' + spritesheet.reference.destination[2]
            ];

            let characters = 0;

            for (let iterator = 0, length = lines.length; iterator < length; iterator += 1) {

                characters = Math.max(characters, this.context.measureText(lines[iterator]).width);
            }

            const alpha = this.context.globalAlpha;

            this.context.globalAlpha = 0.8;

            this.context.fillRect(spritesheet.x + spritesheet.width, spritesheet.y - size, characters + (size * 2), Math.max(spritesheet.height, size * 8) + (size * 2));
            this.context.fillRect(spritesheet.x - size, spritesheet.y - size, spritesheet.width + size, size);
            this.context.fillRect(spritesheet.x - size, spritesheet.y, size, spritesheet.height);
            this.context.fillRect(spritesheet.x - size, spritesheet.y + spritesheet.height, spritesheet.width + size, Math.max(size, (size * 9) - spritesheet.height));

            this.context.globalAlpha = alpha;

            this.context.fillStyle = 'white';

            for (let iterator = 0, length = lines.length; iterator < length; iterator += 1) {

                this.context.fillText(lines[iterator], spritesheet.x + spritesheet.width + size, spritesheet.y + size * iterator);
            }

            this.context.restore();
        });
    }
}

export {spritesheet};
