function animate(entity) {

    const animationComponent = entity.get('animation');

    if (animationComponent.frames.length > 1) {

        animationComponent.elapsed += this.delta.update;

        const duration = 1000 / animationComponent.framerate;

        while (animationComponent.elapsed >= duration) {

            animationComponent.elapsed -= duration;
            animationComponent.frame = (animationComponent.frame === animationComponent.frames.length - 1) ? 0 : animationComponent.frame + 1;
            animationComponent.current = animationComponent.frames[animationComponent.frame];
        }
    }
}

export {animate};
