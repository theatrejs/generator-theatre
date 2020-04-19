import * as Ease from 'modules/ease.js';

function forces(entities) {

    Object.entries(entities).forEach(([name, entity]) => {

        const forcesComponent = entity.get('forces');
        const positionComponent = entity.get('position');

        const trashes = [];

        forcesComponent.parts.forEach((force) => {

            const unlimited = force.$ending === false;
            const remaining = force.duration - force.elapsed;
            const delta = (unlimited === false && this.delta > remaining) ? remaining : this.delta;

            const progress = (force.elapsed + delta) / force.duration;

            const $source = force.$easing;
            const $easing = (force.$easing !== false ? this.snippets[$source.scope][$source.name]() : Ease.linear(1));

            const moved = {

                'x': force.x * $easing(progress),
                'y': force.y * $easing(progress)
            };

            positionComponent.x += moved.x - force.moved.x;
            positionComponent.y += moved.y - force.moved.y;
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

                $ending(entity, force.moved.x, force.moved.y, force.elapsed);
                trashes.push(force);
            }
        });

        forcesComponent.parts = forcesComponent.parts.filter((force) => {

            return trashes.indexOf(force) === -1;
        });
    });
}

export {forces};
