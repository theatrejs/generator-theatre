function Entity(name, components) {

    function add(components) {

        components.forEach((component) => {

            this.components[component.name] = component;
        });
    }

    function get(component) {

        return this.components[component];
    }

    function has(components) {

        for (let iterator = 0, length = components.length; iterator < length; iterator += 1) {

            const search = components[iterator];
            const component = search.replace('not:', '');
            const exlude = search !== component;

            if (this.components.hasOwnProperty(component) === exlude) {

                return false;
            }
        }

        return true;
    }

    function remove(components) {

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

    this.add(components)
}

function World() {

    function add(entity) {

        this.entities.push(entity);
    }

    function get(entity) {

        for (let iterator = 0, length = this.entities.length; iterator < length; iterator += 1) {

            const current = this.entities[iterator];

            if (current.name === entity) {

                return current;
            }
        }
    }

    function remove(entity) {

        this.entities.splice(this.entities.indexOf(entity), 1);
    }

    this.entities = [];

    this.add = add;
    this.get = get;
    this.remove = remove;
}

function system(entities, components, handler) {

    entities.forEach((entity) => {

        if (entity.has(components) === true) {

            handler(entity);
        }
    });
}

export {

    // exports current module as an object
    World,

    // exports helpers for current module
    Entity,
    system
};
