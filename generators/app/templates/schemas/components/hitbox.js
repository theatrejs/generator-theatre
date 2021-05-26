const path = require('path');

const $snippetPropertySchema = require(path.resolve('schemas/properties/$snippet.js'));
const sizePropertySchema = require(path.resolve('schemas/properties/size.js'));

module.exports = {

    'type': 'object',
    'properties': {

        'x': {'type': 'number'},
        'y': {'type': 'number'},
        'width': sizePropertySchema,
        'height': sizePropertySchema,
        'type': {'type': 'string'},
        'triggers': {

            'type': 'array',
            'items': {

                'type': 'object',
                'properties': {

                    'type': {'type': 'string'},
                    'conditions': {

                        'type': 'array',
                        'items': $snippetPropertySchema
                    },
                    '$match': $snippetPropertySchema,
                    '$unmatch': {

                        'oneOf': [

                            $snippetPropertySchema,
                            {'enum': [false]}
                        ]
                    }
                },
                'required': ['type', 'conditions', '$match', '$unmatch'],
                'additionalProperties': false
            }
        },
    },
    'required': ['x', 'y', 'width', 'height', 'type', 'triggers'],
    'additionalProperties': false
};
