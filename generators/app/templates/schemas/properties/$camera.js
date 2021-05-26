module.exports = {

    'type': 'object',
    'properties': {

        'type': {

            'type': 'string',
            'enum': ['$'],
        },
        'name': {'type': 'string'}
    },
    'required': ['type', 'name'],
    'additionalProperties': false
};
