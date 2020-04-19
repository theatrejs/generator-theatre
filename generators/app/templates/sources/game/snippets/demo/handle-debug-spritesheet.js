import {collide} from 'modules/collide.js';
import {Point, Rectangle} from 'modules/shape.js';

export default function (spritesheet, entity) {

    const cameraComponent = entity.get('camera');
    const originComponent = entity.get('origin');
    const positionComponent = entity.get('position');

    const $camera = this.$[cameraComponent.$camera.name];
    const $origin = this.$[originComponent.$origin.name];

    const box = new Rectangle(

        Math.floor((positionComponent.x + spritesheet.destination[0]) * $origin.scale() + $origin.x()) - ($camera.position.x + $camera.shaking.shift.x),
        Math.floor((positionComponent.y + spritesheet.destination[1]) * $origin.scale() + $origin.y()) - ($camera.position.y + $camera.shaking.shift.y),
        (spritesheet.destination[3] * $origin.scale()),
        (spritesheet.destination[4] * $origin.scale())
    );

    if (typeof this.$.debugging.x === 'number'
    && typeof this.$.debugging.y === 'number'
    && collide(new Point(this.$.debugging.x, this.$.debugging.y), box) === true) {

        this.snippets.demo['draw-debug-layer'](

            entity,
            {
                'name': spritesheet.name,
                'x': box.x,
                'y': box.y,
                'width': box.width,
                'height': box.height,
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

            if (collide(mouse, box) === true) {

                console.log('debugging :', 'spritesheet', '\'' + spritesheet.name + '\'', '(frame #' + (spritesheet.frame + 1) + ')');
                console.log(spritesheet);
                console.log('debugging :', 'entity', '\'' + entity.name + '\'');
                console.log(entity);
            }
        }
    });
};
