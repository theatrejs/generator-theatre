const path = require('path');

const $imagePropertySchema = require(path.resolve('schemas/properties/$image.js'));
const destinationPropertySchema = require(path.resolve('schemas/properties/destination.js'));
const elapsedPropertySchema = require(path.resolve('schemas/properties/elapsed.js'));
const opacityPropertySchema = require(path.resolve('schemas/properties/opacity.js'));

module.exports = {

    'type': 'object',
    'properties': {

        '$source': $imagePropertySchema,
        'frames': {

            'type': 'array',
            'items': {

                'type': 'array',
                'items': [

                    {
                        'type': 'number',
                        'minimum': 0
                    },
                    {
                        'type': 'number',
                        'minimum': 0
                    },
                    {
                        'type': 'number',
                        'exclusiveMinimum': 0
                    },
                    {
                        'type': 'number',
                        'exclusiveMinimum': 0
                    }
                ],
                'minItems': 4,
                'maxItems': 4,
                'additionalItems': false
            },
            'minItems': 1
        },
        'frame': {

            'type': 'number',
            'minimum': 0
        },
        'framerate': {

            'type': 'number',
            'exclusiveMinimum': 0
        },
        'destination': destinationPropertySchema,
        'opacity': opacityPropertySchema,
        'elapsed': elapsedPropertySchema
    },
    'required': ['$source', 'frames', 'frame', 'framerate', 'destination', 'opacity', 'elapsed'],
    'additionalProperties': false
};
