function intervals(entities) {

    Object.entries(entities).forEach(([name, entity]) => {

        const intervalsComponent = entity.get('intervals');

        Object.entries(intervalsComponent).forEach(([name, interval]) => {

            interval.elapsed += this.delta;

            while (interval.elapsed >= interval.duration) {

                if (typeof interval.$ending === 'object'
                && interval.$ending !== null) {

                    const $ending = interval.$ending;
                    const ending = this.snippets[$ending.scope][$ending.name];

                    ending(entity);
                }

                interval.elapsed -= interval.duration;
            }
        });

        if (Object.keys(intervalsComponent).length === 0) {

            entity.remove('intervals');
        }
    });
}

export {intervals};
