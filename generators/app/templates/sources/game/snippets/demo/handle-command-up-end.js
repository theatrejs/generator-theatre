export default function (entity, input) {

    const stateComponent = entity.get('state');

    stateComponent.changes.push({

        'before': {

            'UP': stateComponent.state['UP']
        },
        'after': {

            'UP': 0
        }
    });

    stateComponent.state['UP'] = 0;
};
