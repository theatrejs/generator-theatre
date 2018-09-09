function framerate(entity) {

    const framerateComponent = entity.get('framerate');

    framerateComponent.elapsed += this.delta.render;
    framerateComponent.frames += 1;

    if (framerateComponent.elapsed >= 1000) {

        entity.get('text').text = 'fps:' + Math.round(framerateComponent.frames * 1000 / framerateComponent.elapsed);
        framerateComponent.elapsed = 0;
        framerateComponent.frames = 0;
    }
}

export {framerate};
