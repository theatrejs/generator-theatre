const path = require('path');

const componentsSchema = require(path.resolve('schemas/components.js'));

module.exports = {

    'type': 'object',
    'properties': {

        'name': {'type': 'string'},
        'components': componentsSchema
    },
    'required': ['name', 'components'],
    'additionalProperties': false
};
