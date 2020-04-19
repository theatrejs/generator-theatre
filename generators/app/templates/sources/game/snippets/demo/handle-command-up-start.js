export default function (entity, input) {

    const stateComponent = entity.get('state');

    stateComponent.changes.push({

        'before': {

            'UP': stateComponent.state['UP'],
            'DOWN': stateComponent.state['DOWN']
        },
        'after': {

            'UP': 1,
            'DOWN': 0
        }
    });

    stateComponent.state['UP'] = 1;
    stateComponent.state['DOWN'] = 0;
};
