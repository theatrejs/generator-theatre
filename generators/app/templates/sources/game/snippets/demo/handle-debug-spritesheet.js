import {collide} from 'modules/collide.js';
import {Point, Rectangle} from 'modules/shape.js';

export default function (spritesheet, entity) {

    const camerasComponent = entity.get('cameras');
    const originComponent = entity.get('origin');
    const positionComponent = entity.get('position');

    camerasComponent.forEach((camera) => {

        const $camera = this.$[camera.$camera.name];
        const $origin = this.$[originComponent.$origin.name];

        const destination = {

            'x': Math.floor((positionComponent.x + spritesheet.destination[0]) * $origin.scale() + $origin.x()),
            'y': Math.floor((positionComponent.y + spritesheet.destination[1]) * $origin.scale() + $origin.y()),
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
        && collide(mouse, sprite) === true
        && collide(mouse, screen) === true) {

            this.snippets.demo['draw-debug-layer'](

                entity,
                {
                    'name': spritesheet.name,
                    'x': sprite.x,
                    'y': sprite.y,
                    'width': sprite.width,
                    'height': sprite.height,
                    'frame': spritesheet.frame,
                    'framerate': spritesheet.framerate
                }
            );
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

                    console.log('debugging :', 'spritesheet', '\'' + spritesheet.name + '\'', '(frame #' + (spritesheet.frame + 1) + ')');
                    console.log(spritesheet);
                    console.log('debugging :', 'entity', '\'' + entity.name + '\'');
                    console.log(entity);
                }
            }
        });
    });
};
