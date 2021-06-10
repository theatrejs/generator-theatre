const path = require('path');

const camerasComponentSchema = require(path.resolve('schemas/components/cameras.js'));
const fadeComponentSchema = require(path.resolve('schemas/components/fade.js'));
const forcesComponentSchema = require(path.resolve('schemas/components/forces.js'));
const hitboxComponentSchema = require(path.resolve('schemas/components/hitbox.js'));
const imagesComponentSchema = require(path.resolve('schemas/components/images.js'));
const intervalsComponentSchema = require(path.resolve('schemas/components/intervals.js'));
const machinesComponentSchema = require(path.resolve('schemas/components/machines.js'));
const opacityComponentSchema = require(path.resolve('schemas/components/opacity.js'));
const positionComponentSchema = require(path.resolve('schemas/components/position.js'));
const previousComponentSchema = require(path.resolve('schemas/components/previous.js'));
const textComponentSchema = require(path.resolve('schemas/components/text.js'));
const timeoutsComponentSchema = require(path.resolve('schemas/components/timeouts.js'));
const velocityComponentSchema = require(path.resolve('schemas/components/velocity.js'));

const cameras = {

    'type': 'object',
    'properties': {

        'name': {

            'type': 'string',
            'enum': ['cameras']
        },
        'parameters': camerasComponentSchema
    },
    'required': ['name'],
    'additionalProperties': false
};

const fade = {

    'type': 'object',
    'properties': {

        'name': {

            'type': 'string',
            'enum': ['fade']
        },
        'parameters': fadeComponentSchema
    },
    'required': ['name'],
    'additionalProperties': false
};

const forces = {

    'type': 'object',
    'properties': {

        'name': {

            'type': 'string',
            'enum': ['forces']
        },
        'parameters': forcesComponentSchema
    },
    'required': ['name'],
    'additionalProperties': false
};

const hitbox = {

    'type': 'object',
    'properties': {

        'name': {

            'type': 'string',
            'enum': ['hitbox']
        },
        'parameters': hitboxComponentSchema
    },
    'required': ['name'],
    'additionalProperties': false
};

const images = {

    'type': 'object',
    'properties': {

        'name': {

            'type': 'string',
            'enum': ['images']
        },
        'parameters': imagesComponentSchema
    },
    'required': ['name'],
    'additionalProperties': false
};

const intervals = {

    'type': 'object',
    'properties': {

        'name': {

            'type': 'string',
            'enum': ['intervals']
        },
        'parameters': intervalsComponentSchema
    },
    'required': ['name'],
    'additionalProperties': false
};

const machines = {

    'type': 'object',
    'properties': {

        'name': {

            'type': 'string',
            'enum': ['machines']
        },
        'parameters': machinesComponentSchema
    },
    'required': ['name'],
    'additionalProperties': false
};

const opacity = {

    'type': 'object',
    'properties': {

        'name': {

            'type': 'string',
            'enum': ['opacity']
        },
        'parameters': opacityComponentSchema
    },
    'required': ['name'],
    'additionalProperties': false
};

const position = {

    'type': 'object',
    'properties': {

        'name': {

            'type': 'string',
            'enum': ['position']
        },
        'parameters': positionComponentSchema
    },
    'required': ['name'],
    'additionalProperties': false
};

const previous = {

    'type': 'object',
    'properties': {

        'name': {

            'type': 'string',
            'enum': ['previous']
        },
        'parameters': previousComponentSchema
    },
    'required': ['name'],
    'additionalProperties': false
};

const text = {

    'type': 'object',
    'properties': {

        'name': {

            'type': 'string',
            'enum': ['text']
        },
        'parameters': textComponentSchema
    },
    'required': ['name'],
    'additionalProperties': false
};

const timeouts = {

    'type': 'object',
    'properties': {

        'name': {

            'type': 'string',
            'enum': ['timeouts']
        },
        'parameters': timeoutsComponentSchema
    },
    'required': ['name'],
    'additionalProperties': false
};

const velocity = {

    'type': 'object',
    'properties': {

        'name': {

            'type': 'string',
            'enum': ['velocity']
        },
        'parameters': velocityComponentSchema
    },
    'required': ['name'],
    'additionalProperties': false
};

module.exports = {

    'type': 'array',
    'contains': position,
    'items': {

        'anyOf': [

            cameras,
            fade,
            forces,
            hitbox,
            images,
            intervals,
            machines,
            opacity,
            position,
            previous,
            text,
            timeouts,
            velocity
        ]
    }
};
