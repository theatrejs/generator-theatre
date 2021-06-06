function machines(entities) {

    if (this.events.length > 0) {

        Object.entries(entities).forEach(([name, entity]) => {

            const machinesComponent = entity.get('machines');

            Object.entries(machinesComponent).forEach(([name, $machine]) => {

                if (typeof $machine.cache === 'undefined') {

                    $machine.cache = this[$machine.type][$machine.scope][$machine.name]();
                }

                const machine = $machine.cache;

                const {events} = machine;

                events.push(...this.events);
            });
        });

        this.events.length = 0;
    }

    Object.entries(entities).forEach(([name, entity]) => {

        const machinesComponent = entity.get('machines');

        Object.entries(machinesComponent).forEach(([name, $machine]) => {

            if (typeof $machine.cache === 'undefined') {

                $machine.cache = this[$machine.type][$machine.scope][$machine.name]();
            }

            const machine = $machine.cache;

            const {events, transitions} = machine;

            while (events.length > 0) {

                const event = events.shift();

                const {state} = machine;

                for (let iterator = 0, length = transitions.length; iterator < length; iterator += 1) {

                    const {from, to, triggers, $conditions, $matches} = transitions[iterator];

                    if (state !== from) {

                        continue;
                    }

                    if (triggers.indexOf(event) === -1) {

                        continue;
                    }

                    if (typeof $conditions.find(({name, scope, type}) => this[type][scope][name](entity) === false) !== 'undefined') {

                        continue;
                    }

                    machine.state = to;

                    $matches.forEach(($match) => {

                        this[$match.type][$match.scope][$match.name](entity);
                    });

                    break;
                }
            }
        });
    });

    if (this.events.length > 0) {

        machines.call(this, entities);
    }
}

export {machines};
