export default function (entity) {

    if (entity.has('opacity') === false) {

        entity.add({

            'name': 'opacity',
            'parameters': {

                'opacity': 1
            }
        });
    }

    return entity.get('opacity');
};
