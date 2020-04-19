function timeout(entities) {

    Object.entries(entities).forEach(([name, entity]) => {

        const timeoutComponent = entity.get('timeout');

        timeoutComponent.elapsed += this.delta;

        if (timeoutComponent.elapsed >= timeoutComponent.duration
        && timeoutComponent.$ending !== false) {

            const $source = timeoutComponent.$ending;
            const $ending = this.snippets[$source.scope][$source.name];

            const extra = timeoutComponent.elapsed - timeoutComponent.duration;

            $ending(entity, extra);
        }
    });
}

export {timeout};
