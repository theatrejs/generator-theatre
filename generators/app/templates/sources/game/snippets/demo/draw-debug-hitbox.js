import {Rectangle} from 'modules/shape.js';

export default function (entity) {

    const camerasComponent = entity.get('cameras');
    const hitboxComponent = entity.get('hitbox');
    const originComponent = entity.get('origin');
    const positionComponent = entity.get('position');

    camerasComponent.forEach((camera) => {

        const $camera = this.$[camera.$camera.name];
        const $origin = this.$[originComponent.$origin.name];

        const hitbox = new Rectangle(

            $camera.screen.x() + (positionComponent.x + hitboxComponent.x) * $camera.screen.scale() - ($camera.position.x() * $camera.screen.scale() - $camera.screen.width() / 2 + $camera.shaking.shift.x * $camera.screen.scale()),
            $camera.screen.y() + (positionComponent.y + hitboxComponent.y) * $camera.screen.scale() - ($camera.position.y() * $camera.screen.scale() - $camera.screen.height() / 2 + $camera.shaking.shift.y * $camera.screen.scale()),
            hitboxComponent.width * $camera.screen.scale(),
            hitboxComponent.height * $camera.screen.scale()
        );

        const width = 2;
        const offset = width / 2;

        this.context.save();

        this.context.lineWidth = width;
        this.context.font = 'bold 16px Courier New';
        this.context.textAlign = 'start';
        this.context.textBaseline = 'top';

        this.context.fillStyle = '#639bff';

        this.context.fillText(

            'hitbox \'' + entity.name + '\'',
            hitbox.x,
            hitbox.y - 16
        );

        this.context.strokeStyle = '#639bff';

        this.context.strokeRect(hitbox.x + offset, hitbox.y + offset, hitbox.width - width, hitbox.height - width);

        this.context.restore();
    });
};
