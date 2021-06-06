const path = require('path');

const $snippetPropertySchema = require(path.resolve('schemas/properties/$snippet.js'));
const durationPropertySchema = require(path.resolve('schemas/properties/duration.js'));
const elapsedPropertySchema = require(path.resolve('schemas/properties/elapsed.js'));

module.exports = {

    'type': 'object',
    'properties': {

        'x': {'type': 'number'},
        'y': {'type': 'number'},
        'duration': durationPropertySchema,
        '$easing': $snippetPropertySchema,
        '$handling': {

            'oneOf': [

                $snippetPropertySchema,
                {'enum': [false]}
            ]
        },
        '$ending': {

            'oneOf': [

                $snippetPropertySchema,
                {'enum': [false]}
            ]
        },
        'elapsed': elapsedPropertySchema
    },
    'required': ['x', 'y', 'duration', '$easing', '$handling', '$ending', 'elapsed'],
    'additionalProperties': false
};
