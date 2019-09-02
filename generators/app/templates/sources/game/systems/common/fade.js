function fade(entities) {

    Object.entries(entities).forEach(([name, entity]) => {

        const cameraComponent = entity.get('camera');
        const fadeComponent = entity.get('fade');

        if (fadeComponent.fade === null) {

            fadeComponent.fade = fadeComponent.opacity - cameraComponent.opacity;
        }

        const remaining = fadeComponent.duration - fadeComponent.elapsed;
        const delta = this.delta.render > remaining ? remaining : this.delta.render;

        const progress = (fadeComponent.elapsed + delta) / fadeComponent.duration;
        const faded = fadeComponent.fade * fadeComponent.easing(progress);

        cameraComponent.opacity += faded - fadeComponent.faded;
        fadeComponent.faded = faded;

        fadeComponent.elapsed += delta;

        if (fadeComponent.elapsed >= fadeComponent.duration
        && typeof fadeComponent.ending === 'function') {

            fadeComponent.ending(entity, this.delta.render - delta);
        }
    });
}

export {fade};
