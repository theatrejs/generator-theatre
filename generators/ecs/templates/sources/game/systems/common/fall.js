function fall(entity) {

    const fallComponent = entity.get('fall');
    const positionComponent = entity.get('position');

    const delta = this.delta.update;

    const progress = (fallComponent.elapsed + delta) / fallComponent.duration;
    const moved = (fallComponent.height * fallComponent.easing(progress));

    positionComponent.y += moved - fallComponent.moved;
    fallComponent.moved = moved;

    fallComponent.elapsed += delta;
}

export {fall};
