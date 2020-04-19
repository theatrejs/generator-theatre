export default function (entity, input) {

    const stateComponent = entity.get('state');

    stateComponent.changes.push({

        'before': {

            'LEFT': stateComponent.state['LEFT']
        },
        'after': {

            'LEFT': 0
        }
    });

    stateComponent.state['LEFT'] = 0;
};
