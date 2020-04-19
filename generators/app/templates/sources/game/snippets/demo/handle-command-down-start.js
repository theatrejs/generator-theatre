export default function (entity, input) {

    const stateComponent = entity.get('state');

    stateComponent.changes.push({

        'before': {

            'UP': stateComponent.state['UP'],
            'DOWN': stateComponent.state['DOWN']
        },
        'after': {

            'UP': 0,
            'DOWN': 1
        }
    });

    stateComponent.state['UP'] = 0;
    stateComponent.state['DOWN'] = 1;
};
