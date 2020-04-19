export default function (entity, input) {

    const stateComponent = entity.get('state');

    stateComponent.changes.push({

        'before': {

            'DOWN': stateComponent.state['DOWN']
        },
        'after': {

            'DOWN': 0
        }
    });

    stateComponent.state['DOWN'] = 0;
};
