const path = require('path');

const $imagePropertySchema = require(path.resolve('schemas/properties/$image.js'));
const sizePropertySchema = require(path.resolve('schemas/properties/size.js'));

module.exports = {

    'type': 'object',
    'properties': {

        '$source': $imagePropertySchema,
        'map': {

            'type': 'array',
            'items': {'type': 'string'},
            'minItems': 1
        },
        'size': {

            'type': 'array',
            'items': sizePropertySchema,
            'minItems': 2,
            'maxItems': 2
        }
    },
    'required': ['$source', 'map', 'size'],
    'additionalProperties': false
};
