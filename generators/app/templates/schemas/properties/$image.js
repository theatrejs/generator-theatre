module.exports = {

    'type': 'object',
    'properties': {

        'type': {

            'type': 'string',
            'enum': ['images']
        },
        'scope': {'type': 'string'},
        'name': {'type': 'string'}
    },
    'required': ['type', 'scope', 'name'],
    'additionalProperties': false
};
