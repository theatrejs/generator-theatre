function add(A, B) {

    return map(A, (value, row, column) => {

        return A[row][column] + B[row][column];
    });
}

function create(rows, columns, initialize = () => 1) {

    const matrix = [];

    for (let row = 0; row < rows; row += 1) {

        matrix[row] = [];

        for (let column = 0; column < columns; column += 1) {

            matrix[row][column] = initialize(row, column);
        }
    }

    return matrix;
}

function hadamard(A, B) {

    return map(A, (value, row, column) => {

        return A[row][column] * B[row][column];
    });
}

function map(A, handler) {

    const matrix = [];

    for (let row = 0, rows = A.length; row < rows; row += 1) {

        matrix[row] = [];

        for (let column = 0, columns = A[0].length; column < columns; column += 1) {

            matrix[row][column] = handler(A[row][column], row, column);
        }
    }

    return matrix;
}

function multiply(A, B) {

    const matrix = [];

    for (let row = 0, rows = A.length; row < rows; row += 1) {

        matrix[row] = [];

        for (let column = 0, columns = B[0].length; column < columns; column += 1) {

            matrix[row][column] = 0;

            for (let iterator = 0, iterators = A[0].length; iterator < iterators; iterator++) {

                matrix[row][column] += A[row][iterator] * B[iterator][column];
            }
        }
    }

    return matrix;
}

function scale(A, factor) {

    return map(A, (value) => {

        return value * factor;
    });
}

function squash(A) {

    const matrix = [[]];

    for (let column = 0, columns = A[0].length; column < columns; column += 1) {

        matrix[0][column] = 0;

        for (let row = 0, rows = A.length; row < rows; row += 1) {

            matrix[0][column] += A[row][column];
        }
    }

    return matrix;
}

function subtract(A, B) {

    return map(A, (value, row, column) => {

        return A[row][column] - B[row][column];
    });
}

function transpose(A) {

    const matrix = [];

    for (let row = 0, rows = A[0].length; row < rows; row += 1) {

        matrix[row] = [];

        for (let column = 0, columns = A.length; column < columns; column += 1) {

            matrix[row][column] = A[column][row];
        }
    }

    return matrix;
}

// exports current module as functions
export {add, create, hadamard, map, multiply, scale, squash, subtract, transpose};
