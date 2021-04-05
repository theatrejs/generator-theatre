import {Rectangle} from 'modules/shape.js';

function hitbox(entities) {

    Object.entries(entities).forEach(([name, entity]) => {

        const camerasComponent = entity.get('cameras');
        const hitboxComponent = entity.get('hitbox');
        const positionComponent = entity.get('position');

        camerasComponent.forEach((camera) => {

            const $camera = this.$[camera.$camera.name];

            const hitbox = new Rectangle(

                $camera.screen.x() + (positionComponent.x + hitboxComponent.x - (hitboxComponent.width / 2)) * $camera.screen.scale() - ($camera.position.x() * $camera.screen.scale() - $camera.screen.width() / 2 + $camera.shaking.shift.x * $camera.screen.scale()),
                $camera.screen.y() + (positionComponent.y + hitboxComponent.y - (hitboxComponent.height / 2)) * $camera.screen.scale() - ($camera.position.y() * $camera.screen.scale() - $camera.screen.height() / 2 + $camera.shaking.shift.y * $camera.screen.scale()),
                hitboxComponent.width * $camera.screen.scale(),
                hitboxComponent.height * $camera.screen.scale()
            );

            const width = 1 * $camera.screen.scale();
            const offset = width / 2;

            this.context.save();

            this.context.fillStyle = 'rgba(251, 242, 54, 0.2)';
            this.context.fillRect(hitbox.x, hitbox.y, hitbox.width, hitbox.height);

            this.context.lineWidth = width;

            this.context.strokeStyle = 'rgba(251, 242, 54, 1)';

            this.context.strokeRect(hitbox.x + offset, hitbox.y + offset, hitbox.width - width, hitbox.height - width);

            this.context.restore();
        });
    });
}

export {hitbox};
