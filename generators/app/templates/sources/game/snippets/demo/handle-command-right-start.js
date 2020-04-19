export default function (entity, input) {

    const stateComponent = entity.get('state');

    stateComponent.changes.push({

        'before': {

            'RIGHT': stateComponent.state['RIGHT'],
            'LEFT': stateComponent.state['LEFT']
        },
        'after': {

            'RIGHT': 1,
            'LEFT': 0
        }
    });

    stateComponent.state['RIGHT'] = 1;
    stateComponent.state['LEFT'] = 0;
};
