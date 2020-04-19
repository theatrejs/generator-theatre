export default function (entity, input) {

    const stateComponent = entity.get('state');

    stateComponent.changes.push({

        'before': {

            'RIGHT': stateComponent.state['RIGHT']
        },
        'after': {

            'RIGHT': 0
        }
    });

    stateComponent.state['RIGHT'] = 0;
};
