const path = require('path');

const $cameraPropertySchema = require(path.resolve('schemas/properties/$camera.js'));
const opacityPropertySchema = require(path.resolve('schemas/properties/opacity.js'));

module.exports = {

    'type': 'array',
    'items': {

        'type': 'object',
        'properties': {

            '$camera': $cameraPropertySchema,
            'opacity': opacityPropertySchema
        },
        'required': ['$camera', 'opacity'],
        'additionalProperties': false
    }
};
