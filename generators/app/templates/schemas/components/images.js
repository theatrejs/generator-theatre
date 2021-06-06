const path = require('path');

const $partialPropertySchema = require(path.resolve('schemas/properties/$partial.js'));

module.exports = {

    'type': 'object',
    'additionalProperties': $partialPropertySchema
};
