function events(entities) {

    Object.entries(entities).forEach(([name, entity]) => {

        const machinesComponent = entity.get('machines');

        Object.entries(machinesComponent).forEach(([name, $machine]) => {

            if (typeof $machine.cache === 'undefined') {

                $machine.cache = this.assets[$machine.type][$machine.scope][$machine.name]();
            }

            const machine = $machine.cache;

            const {events} = machine;

            events.push(...this.events);
        });
    });
}

export {events};
