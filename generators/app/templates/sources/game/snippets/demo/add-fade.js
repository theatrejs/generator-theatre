export default function (entity, extra) {

    entity.add({

        'name': 'fade',
        'parameters': {

            "opacity": 1,
            "duration": 800,
            "$easing": {

                "type": "snippets",
                "scope": "demo",
                "name": "handle-fade-easing"
            },
            "$ending": {

                "type": "snippets",
                "scope": "common",
                "name": "remove-fade"
            },
            "elapsed": extra
        }
    });
};
