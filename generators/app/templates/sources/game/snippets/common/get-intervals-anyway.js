export default function (entity) {

    if (entity.has('intervals') === false) {

        entity.add({

            'name': 'intervals',
            'parameters': {}
        });
    }

    return entity.get('intervals');
};
