import * as Ease from 'modules/ease.js';

function forces(entities) {

    Object.entries(entities).forEach(([name, entity]) => {

        const forcesComponent = entity.get('forces');

        if (entity.has('velocity') === false) {

            entity.add({

                'name': 'velocity',
                'parameters': {

                    'top': 0,
                    'right': 0,
                    'bottom': 0,
                    'left': 0
                }
            });
        }

        const velocityComponent = entity.get('velocity');

        const trashes = [];

        forcesComponent.forEach((force) => {

            const unlimited = force.$ending === false;
            const remaining = force.duration - force.elapsed;
            const delta = (unlimited === false && this.delta > remaining) ? remaining : this.delta;

            const progress = (force.elapsed + delta) / force.duration;

            const $source = force.$easing;
            const $easing = (force.$easing !== false ? this.snippets[$source.scope][$source.name]() : Ease.linear(1));

            if (typeof force.moved === 'undefined') {

                force.moved = {

                    'x': 0,
                    'y': 0
                };
            }

            const moved = {

                'x': force.x * $easing(progress),
                'y': force.y * $easing(progress)
            };

            const top = (moved.y - force.moved.y < 0) ? Math.abs(moved.y - force.moved.y) : 0;
            const right = Math.max(moved.x - force.moved.x, 0);
            const bottom = Math.max(moved.y - force.moved.y, 0);
            const left = (moved.x - force.moved.x < 0) ? Math.abs(moved.x - force.moved.x) : 0;

            velocityComponent.top = Math.max(velocityComponent.top, top);
            velocityComponent.right = Math.max(velocityComponent.right, right);
            velocityComponent.bottom = Math.max(velocityComponent.bottom, bottom);
            velocityComponent.left = Math.max(velocityComponent.left, left);

            force.moved = moved;

            force.elapsed += this.delta;

            if (force.$handling !== false) {

                const $source = force.$handling;
                const $handling = this.snippets[$source.scope][$source.name];

                const remove = () => {

                    trashes.push(force);
                };

                $handling(entity, force.moved.x, force.moved.y, force.elapsed, remove);
            }

            if (force.elapsed >= force.duration
            && force.$ending !== false
            && trashes.indexOf(force) === -1) {

                const $source = force.$ending;
                const $ending = this.snippets[$source.scope][$source.name];

                const extra = force.elapsed - force.duration;

                $ending(entity, extra);
                trashes.push(force);
            }
        });

        const forces = forcesComponent.filter((force) => {

            return trashes.indexOf(force) === -1;
        });

        if (forces.length === 0) {

            entity.remove('forces');
        }

        else {

            entity.add({

                'name': 'forces',
                'parameters': forces
            });
        }
    });
}

export {forces};
