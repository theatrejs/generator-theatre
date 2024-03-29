import * as Ease from 'modules/ease.js';

function forces(entities) {

    Object.entries(entities).forEach(([name, entity]) => {

        const forcesComponent = entity.get('forces');
        const velocityComponent = this.snippets.common['get-velocity-anyway'](entity);

        const trashes = [];

        Object.entries(forcesComponent).forEach(([name, $force]) => {

            if (typeof $force.cache === 'undefined') {

                $force.cache = this[$force.type][$force.scope][$force.name]();
            }

            const force = $force.cache;

            const unlimited = force.$ending === false;
            const remaining = force.duration - force.elapsed;
            const delta = (unlimited === false && this.delta > remaining) ? remaining : this.delta;

            const progress = (force.elapsed + delta) / force.duration;

            const $easing = force.$easing;
            const easing = (force.$easing !== false ? this.snippets[$easing.scope][$easing.name]() : Ease.linear(1));

            if (typeof force.moved === 'undefined') {

                force.moved = {

                    'x': 0,
                    'y': 0
                };
            }

            const moved = {

                'x': force.x * easing(progress),
                'y': force.y * easing(progress)
            };

            const top = (moved.y - force.moved.y < 0) ? Math.abs(moved.y - force.moved.y) : 0;
            const right = Math.max(moved.x - force.moved.x, 0);
            const bottom = Math.max(moved.y - force.moved.y, 0);
            const left = (moved.x - force.moved.x < 0) ? Math.abs(moved.x - force.moved.x) : 0;

            velocityComponent.top = velocityComponent.top + top;
            velocityComponent.right = velocityComponent.right + right;
            velocityComponent.bottom = velocityComponent.bottom + bottom;
            velocityComponent.left = velocityComponent.left + left;

            force.moved = moved;

            force.elapsed += this.delta;

            if (force.$handling !== false) {

                const $handling = force.$handling;
                const handling = this.snippets[$handling.scope][$handling.name];

                const remove = () => {

                    trashes.push(name);
                };

                handling(entity, force.moved.x, force.moved.y, force.elapsed, remove);
            }

            if (force.elapsed >= force.duration
            && force.$ending !== false
            && trashes.indexOf(name) === -1) {

                if (typeof force.$ending === 'object'
                && force.$ending !== null) {

                    const $ending = force.$ending;
                    const ending = this.snippets[$ending.scope][$ending.name];

                    const extra = force.elapsed - force.duration;

                    ending(entity, extra);
                }

                trashes.push(name);
            }
        });

        Object.entries(forcesComponent).forEach(([name, $force]) => {

            if (trashes.indexOf(name) !== -1
            && forcesComponent.hasOwnProperty(name)) {

                delete forcesComponent[name];
            }
        });

        if (Object.keys(forcesComponent).length === 0) {

            entity.remove('forces');
        }
    });
}

export {forces};
