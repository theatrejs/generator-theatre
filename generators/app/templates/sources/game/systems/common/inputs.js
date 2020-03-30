import {Commands} from 'components/common/commands.js';

function inputs(entities) {

    this.$controllers.inputs.forEach((input) => {

        // console.log(input);
    });

    Object.entries(entities).forEach(([name, entity]) => {

        this.$controllers.inputs.forEach(({action, state}) => {

            const inputsComponent = entity.get('inputs');

            inputsComponent.inputs.forEach((input) => {

                if (input.action === action
                && input.state === state) {

                    if (entity.has('commands') === true) {

                        entity.get('commands').commands.push(input.command);
                    }

                    else {

                        entity.add(new Commands([input.command]));
                    }
                }
            });
        });
    });

    this.$controllers.inputs.length = 0;
}

export {inputs};
