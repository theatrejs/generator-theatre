export default function (entity) {

    if (entity.has('velocity') === false) {

        entity.add({

            'name': 'velocity',
            'parameters': {

                'top': 0,
                'right': 0,
                'bottom': 0,
                'left': 0
            }
        });
    }

    return entity.get('velocity');
};
