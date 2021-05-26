const path = require('path');

const $datasetPropertySchema = require(path.resolve('schemas/properties/$dataset.js'));

module.exports = {

    'type': 'object',
    'additionalProperties': $datasetPropertySchema
};
