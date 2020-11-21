import {collide} from 'modules/collide.js';
import {Point, Rectangle} from 'modules/shape.js';

function spritesheet(entities) {

    const highest = {

        'z': 0,
        'camera': null,
        'entity': null,
        'spritesheet': null
    };

    Object.entries(entities).forEach(([name, entity]) => {

        const imagesComponent = entity.get('images');

        imagesComponent.forEach((spritesheet) => {

            const camerasComponent = entity.get('cameras');
            const originComponent = entity.get('origin');
            const positionComponent = entity.get('position');

            camerasComponent.forEach((camera) => {

                const $camera = this.$[camera.$camera.name];
                const $origin = this.$[originComponent.$origin.name];

                const destination = {

                    'x': (positionComponent.x + spritesheet.destination[0]) * $origin.scale() + $origin.x(),
                    'y': (positionComponent.y + spritesheet.destination[1]) * $origin.scale() + $origin.y(),
                    'z': positionComponent.z + spritesheet.destination[2] + $origin.z(),
                    'width': (spritesheet.destination[3] * $origin.scale()),
                    'height': (spritesheet.destination[4] * $origin.scale())
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
                && destination.z >= highest.z
                && collide(mouse, sprite) === true
                && collide(mouse, screen) === true) {

                    highest.z = destination.z;
                    highest.camera = $camera;
                    highest.entity = entity;
                    highest.spritesheet = {

                        'name': spritesheet.name,
                        'x': sprite.x,
                        'y': sprite.y,
                        'z': destination.z,
                        'width': sprite.width,
                        'height': sprite.height
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

                            console.log('debugging :', 'entity', '\'' + entity.name + '\'', '/' , 'spritesheet', '\'' + spritesheet.name + '\'', '/', 'z-index ' + destination.z);
                            console.log(entity);
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

        let layer = this.context.measureText('entity \'' + entity.name + '\'').width;

        if (spritesheet.height >= size * 2) layer = Math.max(this.context.measureText('entity \'' + entity + '\'').width, this.context.measureText('spritesheet \'' + spritesheet.name + '\'').width);

        this.context.fillRect(spritesheet.x + spritesheet.width, spritesheet.y - size, layer + (size * 2), spritesheet.height + (size * 2));
        this.context.fillRect(spritesheet.x - size, spritesheet.y - size, spritesheet.width + size, size);
        this.context.fillRect(spritesheet.x - size, spritesheet.y, size, spritesheet.height);
        this.context.fillRect(spritesheet.x - size, spritesheet.y + spritesheet.height, spritesheet.width + size, size);

        this.context.fillStyle = 'white';

        if (spritesheet.height >= size * 1) this.context.fillText('entity \'' + entity.name + '\'', spritesheet.x + spritesheet.width + size, spritesheet.y + size * 0);
        if (spritesheet.height >= size * 2) this.context.fillText('spritesheet \'' + spritesheet.name + '\'', spritesheet.x + spritesheet.width + size, spritesheet.y + size * 1);
        if (spritesheet.height >= size * 3) this.context.fillText('z-index ' + spritesheet.z, spritesheet.x + spritesheet.width + size, spritesheet.y + size * 2);

        this.context.restore();

        this.$.controllers.inputs.forEach((input) => {

            if (input.type === 'KEYBOARD'
            && input.action === 'KEY_DELETE'
            && input.state === 'DOWN') {

                this.$.world.remove(highest.entity);
            }
        });
    }
}

export {spritesheet};
