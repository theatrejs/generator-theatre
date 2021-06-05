const path = require('path');

const { getOptions, interpolateName } = require('loader-utils');

const Ajv = require('ajv')
const betterAjvErrors = require('better-ajv-errors');

module.exports = function loader(source) {

    const ajv = new Ajv();

    const options = getOptions(this);
    const name = interpolateName(this, options.name, {});

    if (options.pattern.test(name) === false) {

        return source;
    }

    const schema = require(path.resolve(options.path, name.replace(options.pattern, options.replacement) + '.' + options.extension));

    const validate = ajv.compile(schema);
    const json = JSON.parse(source);
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
