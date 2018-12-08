import * as mathematics from './mathematics.js';
import * as matrix from './matrix.js';

function Network(config) {

    const {activation, biasing, learning, network, randomize} = config;

    const activations = {

        'relu': mathematics.relu,
        'sigmoid': mathematics.sigmoid,
        'tanh': mathematics.tanh
    };

    const derivatives = {

        'relu': mathematics.reluPrime,
        'sigmoid': mathematics.sigmoidPrime,
        'tanh': mathematics.tanhPrime
    };

    const activate = activations[activation];
    const derivative = derivatives[activation];

    let layers = [];
    let actives = [];

    function initialize() {

        for (let iterator = 0, length = network.length - 1; iterator < length; iterator += 1) {

            let weights = matrix.create(network[iterator], network[iterator + 1], randomize);
            let biases = matrix.create(1, network[iterator + 1], () => biasing);

            this.weights.push(weights);
            this.biases.push(biases);
        }
    }

    function learn(output, target) {

        const biases = [];
        const weights = [];

        const inputs = layers[0];
        const entries = inputs.length;

        let error = matrix.subtract(output, target);
        let delta = matrix.hadamard(error, matrix.map(layers[this.weights.length], derivative));
        let gradient = matrix.multiply(matrix.transpose(actives[this.weights.length - 2]), delta);

        biases.unshift(matrix.subtract(this.biases[this.biases.length - 1], matrix.scale(matrix.squash(delta), learning / entries)));
        weights.unshift(matrix.subtract(this.weights[this.weights.length - 1], matrix.scale(gradient, learning / entries)));

        for (let iterator = this.weights.length; iterator > 2; iterator -= 1) {

            error = matrix.multiply(delta, matrix.transpose(this.weights[iterator - 1]));
            delta = matrix.hadamard(error, matrix.map(layers[iterator - 1], derivative));
            gradient = matrix.multiply(matrix.transpose(actives[iterator - 3]), delta);

            biases.unshift(matrix.subtract(this.biases[iterator - 2], matrix.scale(matrix.squash(delta), learning / entries)));
            weights.unshift(matrix.subtract(this.weights[iterator - 2], matrix.scale(gradient, learning / entries)));
        }

        error = matrix.multiply(delta, matrix.transpose(this.weights[1]));
        delta = matrix.hadamard(error, matrix.map(layers[1], derivative));
        gradient = matrix.multiply(matrix.transpose(inputs), delta);

        biases.unshift(matrix.subtract(this.biases[0], matrix.scale(matrix.squash(delta), learning / entries)));
        weights.unshift(matrix.subtract(this.weights[0], matrix.scale(gradient, learning / entries)));

        layers = [];
        actives = [];

        this.biases = biases;
        this.weights = weights;
    }

    function load(backup) {

        const data = JSON.parse(backup);

        this.weights = data.weights;
        this.biases = data.biases;
    }

    function mutate(rate, handler) {

        const weights = [];

        for (let iterator = 0, length = network.length - 1; iterator < length; iterator += 1) {

            weights[iterator] = matrix.map(this.weights[iterator], (weight) => {

                return Math.random() >= 1 - rate ? handler(weight) : weight;
            });
        }

        this.weights = weights;
    }

    function predict(inputs) {

        layers = [inputs];
        actives = [];

        let values = inputs;

        for (let iterator = 0, length = network.length - 1; iterator < length; iterator += 1) {

            const weighted = matrix.multiply(values, this.weights[iterator]);
            const biased = matrix.map(weighted, (weight, row, column) => weight + this.biases[iterator][0][column]);

            values = matrix.map(biased, activate);

            layers.push(biased);
            actives.push(values);
        }

        return values;
    }

    function save() {

        return JSON.stringify({

            'weights': this.weights,
            'biases': this.biases
        });
    }

    function train(input, target) {

        const output = this.predict(input);

        learn.call(this, output, target);
    }

    this.biases = [];
    this.weights = [];

    this.load = load;
    this.mutate = mutate;
    this.predict = predict;
    this.save = save;
    this.train = train;

    initialize.call(this);
}

// exports current module as an object
export {Network};
