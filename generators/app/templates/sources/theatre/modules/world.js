function Entity(name, components) {

    function add(components) {

        if (Array.isArray(components) === false) {

            components = [components];
        }

        components.forEach((component) => {

            this.components[component.name] = component;
        });
    }

    function get(component) {

        return this.components[component];
    }

    function has(components) {

        if (Array.isArray(components) === false) {

            components = [components];
        }

        for (let iterator = 0, length = components.length; iterator < length; iterator += 1) {

            const search = components[iterator];
            const component = search.replace('not:', '');
            const exclude = search !== component;

            if (this.components.hasOwnProperty(component) === exclude) {

                return false;
            }
        }

        return true;
    }

    function remove(components) {

        if (Array.isArray(components) === false) {

            components = [components];
        }

        for (let iterator = 0, length = components.length; iterator < length; iterator += 1) {

            const component = components[iterator];

            if (this.components.hasOwnProperty(component) === true) {

                delete this.components[component];
            }
        }
    }

    this.components = {};
    this.name = name;

    this.add = add;
    this.get = get;
    this.has = has;
    this.remove = remove;

    this.add(components);
}

function World(context) {

    function add(entities) {

        if (Array.isArray(entities) === false) {

            entities = [entities];
        }

        entities.forEach((entity) => {

            this.entities[entity.name] = entity;
        });
    }

    function get(entity) {

        return this.entities[entity];
    }

    function remove(entities) {

        if (Array.isArray(entities) === false) {

            entities = [entities];
        }

        for (let iterator = 0, length = entities.length; iterator < length; iterator += 1) {

            const entity = entities[iterator];
            const key = entity.name || entity;

            if (this.entities.hasOwnProperty(key) === true) {

                delete this.entities[key];
            }
        }
    }

    function system(components, handler, entities = this.entities) {

        const chosen = {};

        Object.entries(entities).forEach(([name, entity]) => {

            if (entity.has(components) === true) {

                chosen[name] = entity;
            }
        });

        handler.call(context, chosen);
    }

    this.entities = {};

    this.add = add;
    this.get = get;
    this.remove = remove;
    this.system = system;
}

export {

    // exports current module as an object
    World,

    // exports helpers for current module
    Entity
};
