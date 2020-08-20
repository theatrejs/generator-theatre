function inputs(entities) {

    Object.entries(entities).forEach(([name, entity]) => {

        this.$.controllers.inputs.forEach((input) => {

            const inputsComponent = entity.get('inputs');

            inputsComponent.forEach((control) => {

                if (Array.isArray(control.actions) === true
                && control.actions.indexOf(input.action) !== -1
                && control.state === input.state) {

                    const command = {

                        '$command': control.$command,
                        'parameters': [input]
                    };

                    if (entity.has('commands') === true) {

                        entity.get('commands').push(command);
                    }

                    else {

                        entity.add({

                            'name': 'commands',
                            'parameters': [command]
                        });
                    }
                }
            });
        });
    });
}

export {inputs};
