const path = require('path');

const { getOptions } = require('loader-utils');

const Ajv = require('ajv')
const betterAjvErrors = require('better-ajv-errors');

module.exports = function loader(source) {

    const {schema} = getOptions(this);

    const ajv = new Ajv();
    const json = JSON.parse(source);
    const validate = ajv.compile(schema);
    const valid = validate(json);

    if (valid === false) {

        for (const error of validate.errors) {

            error.dataPath = error.instancePath;
        }

        const output = betterAjvErrors(

            schema,
            json,
            validate.errors,
            {
                'format': 'cli',
                'indent': 4,
                'json': source
            }
        );

        const mode = this.mode

        if (mode === 'development') {

            this.emitError(new Error(output));
        }
        else {

            console.error(new Error(output));
            process.exit(1);
        }
    }

	return source;
}
