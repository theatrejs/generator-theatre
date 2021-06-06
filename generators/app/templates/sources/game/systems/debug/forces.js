import {Point} from 'modules/shape.js';

function forces(entities) {

    Object.entries(entities).forEach(([name, entity]) => {

        const camerasComponent = entity.get('cameras');
        const forcesComponent = entity.get('forces');
        const positionComponent = entity.get('position');

        camerasComponent.forEach((camera) => {

            const $camera = this.$[camera.$camera.name];

            const duration = 1000;
            const frames = this.loop.framerate * duration / 1000;

            for (let iterator = 0; iterator <= frames; iterator += 1) {

                const elapsed = iterator * duration / frames;

                const moved = {

                    'x': 0,
                    'y': 0
                };

                const move = {

                    'x': 0,
                    'y': 0
                };

                Object.entries(forcesComponent).forEach(([name, $force]) => {

                    if (typeof $force.cache === 'undefined') {

                        $force.cache = this[$force.type][$force.scope][$force.name]();
                    }

                    const force = $force.cache;

                    const unlimited = force.$ending === false;

                    let progress = (force.elapsed + elapsed) / force.duration;

                    const $easing = force.$easing;
                    const easing = (force.$easing !== false ? this.snippets[$easing.scope][$easing.name]() : Ease.linear(1));

                    if (typeof force.moved !== 'undefined') {

                        moved.x += force.moved.x;
                        moved.y += force.moved.y;
                    }

                    if (progress >= 1 && unlimited === false) {

                        progress = 1;
                    }

                    move.x += force.x * easing(progress);
                    move.y += force.y * easing(progress);
                });

                this.context.save();

                const width = 2 * $camera.screen.scale();
                const height = 2 * $camera.screen.scale();

                const point = new Point(

                    $camera.screen.x() + (positionComponent.x + move.x - moved.x) * $camera.screen.scale() - ($camera.position.x() * $camera.screen.scale() - $camera.screen.width() / 2 + $camera.shaking.shift.x * $camera.screen.scale()) - width / 2,
                    $camera.screen.y() + (positionComponent.y + move.y - moved.y) * $camera.screen.scale() - ($camera.position.y() * $camera.screen.scale() - $camera.screen.height() / 2 + $camera.shaking.shift.y * $camera.screen.scale()) - height / 2
                );

                this.context.fillStyle = 'black';
                this.context.fillRect(point.x - 1 * $camera.screen.scale(), point.y, width + 2 * $camera.screen.scale(), height);
                this.context.fillRect(point.x, point.y - 1 * $camera.screen.scale(), width, height + 2 * $camera.screen.scale());

                if (iterator === 0) {

                    this.context.fillStyle = 'rgba(106, 190, 48, 1)';
                }

                else if (iterator === frames) {

                    this.context.fillStyle = 'rgba(217, 87, 99, 1)';
                }

                else {

                    this.context.fillStyle = 'rgba(251, 242, 54, 1)';
                }

                this.context.fillRect(point.x, point.y, width, height);

                this.context.restore();
            }
        });
    });
}

export {forces};
