function Entity(name, components = [], catalog) {

    function add(components) {

        if (Array.isArray(components) === false) {

            components = [components];
        }

        components.forEach(({name, parameters}) => {

            const $catalog = catalog();

            if (name in $catalog) {

                let reference = $catalog[name]();

                if (typeof parameters !== 'undefined') {

                    reference = parameters;
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

    function add(entities, ...position) {

        if (Array.isArray(entities) === false) {

            entities = [entities];
        }

        const instances = [];

        entities.forEach((entity) => {

            const instance = this.prepare(entity, ...position);

            this.entities[instance.name] = instance;

            instances.push(this.entities[instance.name]);
        });

        return instances;
    }

    function attach(entities) {

        if (Array.isArray(entities) === false) {

            entities = [entities];
        }

        entities.forEach((entity) => {

            this.entities[entity.name] = entity;
        });
    }

    function empty() {

        this.entities = {};
    }

    function get(entity) {

        return this.entities[entity];
    }

    function initialize(entities, ...shift) {

        this.empty();

        const instances = this.add(entities);

        if (shift.length === 3) {

            this.shift(instances, ...shift);
        }
    }

    function prepare(entity, ...position) {

        if (position.length === 3) {

            const [x, y, z] = position;

            entity.components.push({

                'name': 'position',
                'parameters': {

                    'x': x,
                    'y': y,
                    'z': z
                }
            });
        }

        return new Entity(entity.name, entity.components, catalog);
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

    function shift(entities, ...shift) {

        entities.forEach((entity) => {

            const [x, y, z] = shift;

            entity.get('position').x += x;
            entity.get('position').y += y;
            entity.get('position').z += z;
        });
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
    this.attach = attach;
    this.empty = empty;
    this.get = get;
    this.initialize = initialize;
    this.prepare = prepare;
    this.remove = remove;
    this.shift = shift;
    this.system = system;
}

// exports current module as an object
export {World};
