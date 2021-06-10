const path = require('path');

const componentsSchema = require(path.resolve('schemas/components.js'));

module.exports = {

    'type': 'array',
    'items': {

        'type': 'object',
        'properties': {

            'name': {'type': 'string'},
            'entity': {

                'type': 'object',
                'properties': {

                    'scope': {'type': 'string'},
                    'name': {'type': 'string'}
                },
                'required': ['scope', 'name'],
                'additionalProperties': false
            },
            'components': componentsSchema
        },
        'required': ['name', 'entity'],
        'additionalProperties': false
    }
};
