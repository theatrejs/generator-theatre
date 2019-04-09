function force(entity) {

    const forceComponent = entity.get('force');
    const positionComponent = entity.get('position');

    const remaining = forceComponent.duration - forceComponent.elapsed;
    const delta = this.delta.update > remaining ? remaining : this.delta.update;

    const progress = (forceComponent.elapsed + delta) / forceComponent.duration;

    const moved = {

        'x': forceComponent.x * forceComponent.easing(progress),
        'y': forceComponent.y * forceComponent.easing(progress)
    };

    positionComponent.x += moved.x - forceComponent.moved.x;
    positionComponent.y += moved.y - forceComponent.moved.y;
    forceComponent.moved = moved;

    forceComponent.elapsed += delta;

    if (forceComponent.elapsed >= forceComponent.duration) {

        forceComponent.ending(entity, this.delta.update - delta);
    }
}

export {force};
