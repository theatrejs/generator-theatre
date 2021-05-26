const path = require('path');

const sizePropertySchema = require(path.resolve('schemas/properties/size.js'));

module.exports = {

    'type': 'array',
    'items': [

        {'type': 'number'},
        {'type': 'number'},
        {'type': 'number'},
        sizePropertySchema,
        sizePropertySchema
    ],
    'minItems': 5,
    'maxItems': 5,
    'additionalItems': false
};
