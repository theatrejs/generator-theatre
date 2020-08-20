function Entity(name, components = [], catalog) {

    function add(components) {

        if (Array.isArray(components) === false) {

            components = [components];
        }

        components.forEach(({name, parameters}) => {

            const $catalog = catalog();

            if (name in $catalog) {

                let reference = parameters;

                if (typeof reference === 'undefined') {

                    reference = $catalog[name]();
                }

                this.components[name] = reference;
            }
        });
    }

    function empty() {

        this.components = {};
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

    function initialize(components) {

        this.empty();
        this.add(components);
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
    this.empty = empty;
    this.get = get;
    this.has = has;
    this.initialize = initialize;
    this.remove = remove;

    this.add(components);
}

function World(context, catalog) {

    function add(entities) {

        if (Array.isArray(entities) === false) {

            entities = [entities];
        }

        entities.forEach((entity) => {

            this.entities[entity.name] = new Entity(entity.name, entity.components, catalog);
        });
    }

    function empty() {

        this.entities = {};
    }

    function get(entity) {

        return this.entities[entity];
    }

    function initialize(entities) {

        this.empty();
        this.add(entities);
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

    function system(name, components, handler, entities = this.entities) {

        const chosen = {};

        Object.entries(entities).forEach(([name, entity]) => {

            if (entity.has(components) === true) {

                chosen[name] = entity;
            }
        });

        this.systems[name] = {

            'components': components,
            'entities': chosen
        };

        handler.call(context, chosen);
    }

    this.entities = {};
    this.systems = {};

    this.add = add;
    this.empty = empty;
    this.get = get;
    this.initialize = initialize;
    this.remove = remove;
    this.system = system;
}

// exports current module as an object
export {World};
