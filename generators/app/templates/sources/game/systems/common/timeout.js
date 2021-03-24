function timeout(entities) {

    Object.entries(entities).forEach(([name, entity]) => {

        const timeoutComponent = entity.get('timeout');

        timeoutComponent.elapsed += this.delta;

        if (timeoutComponent.elapsed >= timeoutComponent.duration) {

            if (typeof timeoutComponent.$ending === 'object'
            && timeoutComponent.$ending !== null) {

                const $ending = timeoutComponent.$ending;
                const ending = this.snippets[$ending.scope][$ending.name];

                const extra = timeoutComponent.elapsed - timeoutComponent.duration;

                ending(entity, extra);
            }

            entity.remove('timeout');
        }
    });
}

export {timeout};
