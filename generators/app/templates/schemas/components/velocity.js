module.exports = {

    'type': 'object',
    'properties': {

        'top': {'type': 'number'},
        'right': {'type': 'number'},
        'bottom': {'type': 'number'},
        'left': {'type': 'number'}
    },
    'required': ['top', 'right', 'bottom', 'left'],
    'additionalProperties': false
};
