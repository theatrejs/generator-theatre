const path = require('path');

const $partialPropertySchema = require(path.resolve('schemas/properties/$partial.js'));
const destinationPropertySchema = require(path.resolve('schemas/properties/destination.js'));
const opacityPropertySchema = require(path.resolve('schemas/properties/opacity.js'));

module.exports = {

    'type': 'object',
    'properties': {

        '$font': $partialPropertySchema,
        'anchor': {

            'type': 'object',
            'properties': {

                'horizontal': {

                    'type': 'string',
                    'enum': ['left', 'center', 'middle', 'right']
                },
                'vertical': {

                    'type': 'string',
                    'enum': ['top', 'center', 'middle', 'bottom']
                }
            },
            'required': ['horizontal', 'vertical'],
            'additionalProperties': false
        },
        'destination': destinationPropertySchema,
        'lines': {

            'type': 'array',
            'items': {

                'type': 'string',
                'minLength': 1
            },
            'minItems': 1
        },
        'opacity': opacityPropertySchema
    },
    'required': ['$font', 'anchor', 'destination', 'lines', 'opacity'],
    'additionalProperties': false
};
