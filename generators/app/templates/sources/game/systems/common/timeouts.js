function timeouts(entities) {

    Object.entries(entities).forEach(([name, entity]) => {

        const timeoutsComponent = entity.get('timeouts');

        const trashes = [];

        Object.entries(timeoutsComponent).forEach(([name, timeout]) => {

            timeout.elapsed += this.delta;

            if (timeout.elapsed >= timeout.duration
            && trashes.indexOf(name) === -1) {

                if (typeof timeout.$ending === 'object'
                && timeout.$ending !== null) {

                    const $ending = timeout.$ending;
                    const ending = this.snippets[$ending.scope][$ending.name];

                    const extra = timeout.elapsed - timeout.duration;

                    ending(entity, extra);
                }

                trashes.push(name);
            }
        });

        Object.entries(timeoutsComponent).forEach(([name, $force]) => {

            if (trashes.indexOf(name) !== -1
            && timeoutsComponent.hasOwnProperty(name)) {

                delete timeoutsComponent[name];
            }
        });

        if (Object.keys(timeoutsComponent).length === 0) {

            entity.remove('timeouts');
        }
    });
}

export {timeouts};
