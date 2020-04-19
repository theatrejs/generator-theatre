export default function (entity, extra) {

    entity.add({

        'name': 'fade',
        'parameters': [

            1,
            800,
            {
                'type': 'snippets',
                'scope': 'demo',
                'name': 'handle-fade-easing'
            },
            {
                'type': 'snippets',
                'scope': 'demo',
                'name': 'remove-fade'
            },
            extra
        ]
    });
};
