module.exports = {

    'type': 'object',
    'properties': {

        'type': {

            'type': 'string',
            'enum': ['datasets']
        },
        'scope': {'type': 'string'},
        'name': {'type': 'string'}
    },
    'required': ['type', 'scope', 'name'],
    'additionalProperties': false
};
