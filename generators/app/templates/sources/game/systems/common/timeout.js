function timeout(entities) {

    Object.entries(entities).forEach(([name, entity]) => {

        const timeoutComponent = entity.get('timeout');

        timeoutComponent.elapsed += this.delta.update;

        if (timeoutComponent.elapsed >= timeoutComponent.duration) {

            const extra = timeoutComponent.elapsed - timeoutComponent.duration;
            const ending = timeoutComponent.ending;

            entity.remove('timeout');

            if (typeof ending === 'function') {

                ending(entity, extra);
            }
        }
    });
}

export {timeout};
