export default function (entity, input) {

    const stateComponent = entity.get('state');

    stateComponent.changes.push({

        'before': {

            'RIGHT': stateComponent.state['RIGHT'],
            'LEFT': stateComponent.state['LEFT']
        },
        'after': {

            'RIGHT': 0,
            'LEFT': 1
        }
    });

    stateComponent.state['RIGHT'] = 0;
    stateComponent.state['LEFT'] = 1;
};
