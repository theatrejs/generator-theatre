function state(entities) {

    Object.entries(entities).forEach(([name, entity]) => {

        const stateComponent = entity.get('state');

        const changes = stateComponent.changes;

        if (changes.length > 0) {

            const $source = stateComponent.$handling;
            const $handling = this.snippets[$source.scope][$source.name]

            stateComponent.changes = [];

            $handling(entity, changes);

        }
    });
}

export {state};
