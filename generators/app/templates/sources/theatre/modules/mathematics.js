function hypothenuse(ab, ac) {

    // return the hypothenuse value of a right-angled triangle given its two smallest sides
    return Math.sqrt(Math.pow(ab, 2) + Math.pow(ac, 2));
}

function identity(x) {

    // return the identity of given x
    return x;
}

function normalize(x, minimum, maximum) {

    // return the normalized value with (0, 1) range of given x with given (minimum, maximum) range
    return (x - minimum) / (maximum - minimum);
}

function sigmoid(x) {

    // return the sigmoid value of given x
    return 1 / (1 + Math.exp(-x));
}

// exports current module as functions
export {hypothenuse, identity, normalize, sigmoid};
