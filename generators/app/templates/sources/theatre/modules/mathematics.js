function hypothenuse(ab, ac) {

    // return the hypothenuse value of a right-angled triangle given its two smallest sides
    return Math.sqrt(Math.pow(ab, 2) + Math.pow(ac, 2));
}

function identity(x) {

    // return the identity of given x
    return x;
}

function identityPrime(x) {

    // return the derivative of given x identity value
    return 1;
}

function normalize(x, minimum, maximum) {

    // return the normalized value with (0, 1) range of given x with given (minimum, maximum) range
    return (x - minimum) / (maximum - minimum);
}

function relu(x) {

    // return the relu value of given x
    return x > 0 ? x : 0;
}

function reluPrime(x) {

    // return the derivative of given x relu value
    return x > 0 ? 1 : 0;
}

function sigmoid(x) {

    // return the sigmoid value of given x
    return 1 / (1 + Math.exp(-x));
}

function sigmoidPrime(x) {

    // return the derivative of given x sigmoid value
    return sigmoid(x) * (1 - sigmoid(x));
}

function tanh(x) {

    // return the tanh value of given x
    return (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x));
}

function tanhPrime(x) {

    // return the derivative of given x tanh value
    return 1 - (tanh(x) * tanh(x));
}

// exports current module as functions
export {hypothenuse, identity, identityPrime, normalize, relu, reluPrime, sigmoid, sigmoidPrime, tanh, tanhPrime};
