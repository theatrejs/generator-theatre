function forces(entities) {

    Object.entries(entities).forEach(([name, entity]) => {

        const forcesComponent = entity.get('forces');
        const positionComponent = entity.get('position');

        const trashes = [];

        forcesComponent.parts.forEach((force) => {

            const unlimited = force.ending === false;
            const remaining = force.duration - force.elapsed;
            const delta = (unlimited === false && this.delta.update > remaining) ? remaining : this.delta.update;

            const progress = (force.elapsed + delta) / force.duration;

            const moved = {

                'x': force.x * force.easing(progress),
                'y': force.y * force.easing(progress)
            };

            positionComponent.x += moved.x - force.moved.x;
            positionComponent.y += moved.y - force.moved.y;
            force.moved = moved;

            force.elapsed += this.delta.update;

            if (typeof force.handling === 'function') {

                const remove = () => {

                    trashes.push(force);
                };

                force.handling(entity, force.moved.x, force.moved.y, force.elapsed, remove);
            }

            if (force.elapsed >= force.duration
            && typeof force.ending === 'function'
            && trashes.indexOf(force) === -1) {

                force.ending(entity, force.moved.x, force.moved.y, force.elapsed);
                trashes.push(force);
            }
        });

        forcesComponent.parts = forcesComponent.parts.filter((force) => {

            return trashes.indexOf(force) === -1;
        });
    });
}

export {forces};
