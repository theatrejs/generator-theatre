const path = require('path');

const $snippetPropertySchema = require(path.resolve('schemas/properties/$snippet.js'));
const durationPropertySchema = require(path.resolve('schemas/properties/duration.js'));
const elapsedPropertySchema = require(path.resolve('schemas/properties/elapsed.js'));

module.exports = {

    'type': 'object',
    'additionalProperties': {

        'type': 'object',
        'properties': {

            'duration': durationPropertySchema,
            'elapsed': elapsedPropertySchema,
            '$ending': $snippetPropertySchema
        },
        'required': ['duration', 'elapsed', '$ending'],
        'additionalProperties': false
    }
};
