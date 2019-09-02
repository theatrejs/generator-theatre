function forces(entities) {

    Object.entries(entities).forEach(([name, entity]) => {

        const forcesComponent = entity.get('forces');
        const positionComponent = entity.get('position');

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
        });

        forcesComponent.parts.forEach((force) => {

            if (force.elapsed >= force.duration
            && typeof force.ending === 'function') {

                force.ending(entity, force.elapsed - force.duration);
            }
        });

        forcesComponent.parts = forcesComponent.parts.filter((force) => {

            return (force.elapsed <= force.duration
            || force.ending === false);
        });
    });
}

export {forces};
