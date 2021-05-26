const path = require('path');

const opacityPropertySchema = require(path.resolve('schemas/properties/opacity.js'));

module.exports = {

    'type': 'object',
    'properties': {

        'opacity': opacityPropertySchema
    },
    'required': ['opacity'],
    'additionalProperties': false
};
