const path = require('path');

const $snippetPropertySchema = require(path.resolve('schemas/properties/$snippet.js'));
const durationPropertySchema = require(path.resolve('schemas/properties/duration.js'));
const elapsedPropertySchema = require(path.resolve('schemas/properties/elapsed.js'));
const opacityPropertySchema = require(path.resolve('schemas/properties/opacity.js'));

module.exports = {

    'type': 'object',
    'properties': {

        'opacity': opacityPropertySchema,
        'duration': durationPropertySchema,
        '$easing': {

            'oneOf': [

                $snippetPropertySchema,
                {'enum': [false]}
            ]
        },
        '$ending': {

            'oneOf': [

                $snippetPropertySchema,
                {'enum': [true]}
            ]
        },
        'elapsed': elapsedPropertySchema,
    },
    'required': ['opacity', 'duration', '$easing', '$ending', 'elapsed'],
    'additionalProperties': false
};
