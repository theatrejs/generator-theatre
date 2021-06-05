const path = require('path');

const $snippetPropertySchema = require(path.resolve('schemas/properties/$snippet.js'));

module.exports = {

    'type': 'object',
    'properties': {

        'state': {'type': 'string'},
        'events': {

            'type': 'array',
            'items': {'type': 'string'}
        },
        'transitions': {

            'type': 'array',
            'items': {

                'type': 'object',
                'properties': {

                    'from': {'type': 'string'},
                    'to': {'type': 'string'},
                    'triggers': {

                        'type': 'array',
                        'items': {'type': 'string'}
                    },
                    '$conditions': {

                        'type': 'array',
                        'items': $snippetPropertySchema
                    },
                    '$matches': {

                        'type': 'array',
                        'items': $snippetPropertySchema
                    }
                },
                'required': ['from', 'to', 'triggers', '$conditions', '$matches'],
                'additionalProperties': false
            }
        }
    },
    'required': ['state', 'events', 'transitions'],
    'additionalProperties': false
};
