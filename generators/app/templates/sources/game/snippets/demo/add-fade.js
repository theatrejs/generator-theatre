export default function (entity, extra) {

    entity.add({

        'name': 'fade',
        'parameters': {

            'opacity': 1,
            'duration': 800,
            '$easing': {

                'type': 'snippets',
                'scope': 'common',
                'name': 'easing-in-cubic'
            },
            '$ending': {

                'type': 'snippets',
                'scope': 'common',
                'name': 'handle-fade-ending'
            },
            'elapsed': extra
        }
    });
};
