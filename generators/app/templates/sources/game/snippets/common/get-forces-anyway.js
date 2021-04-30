export default function (entity) {

    if (entity.has('forces') === false) {

        entity.add({

            'name': 'forces',
            'parameters': {}
        });
    }

    return entity.get('forces');
};
