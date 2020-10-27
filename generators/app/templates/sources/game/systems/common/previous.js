function previous(entities) {

    Object.entries(entities).forEach(([name, entity]) => {

        const components = {};

        if (entity.has('position') === true) {

            components.position = JSON.parse(JSON.stringify(entity.get('position')));
        }

        if (entity.has('hitbox') === true) {

            components.hitbox = JSON.parse(JSON.stringify(entity.get('hitbox')));
        }

        const previous = {

            'name': 'previous',
            'parameters': components
        };

        entity.add(previous);
    });
}

export {previous};
