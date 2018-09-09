function diagonal(a, b) {

    const [xa, ya] = a;
    const [xb, yb] = b;

    // return the diagonal distance between a and b
    return Math.max(Math.abs(xa - xb), Math.abs(ya - yb));
}

function euclidean(a, b) {

    const [xa, ya] = a;
    const [xb, yb] = b;

    // return the euclidean distance between a and b
    return Math.sqrt(Math.pow(xa - xb, 2) + Math.pow(ya - yb, 2));
}

function manhattan(a, b) {

    const [xa, ya] = a;
    const [xb, yb] = b;

    // return the manhattan distance between a and b
    return Math.abs(xa - xb) + Math.abs(ya - yb);
}

// exports current module as functions
export {diagonal, euclidean, manhattan};
