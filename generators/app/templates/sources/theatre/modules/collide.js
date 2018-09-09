import {Point, Rectangle} from './shape.js';

const caller = {

    'collidePointPoint': collidePointPoint,
    'collidePointRectangle': collidePointRectangle,
    'collideRectangleRectangle': collideRectangleRectangle
};

function collide(A, B) {

    const parameters = [];

    let name = 'collide';

    if (A instanceof Point === true) {

        parameters.push(A);

        name += 'Point';
    }

    if (B instanceof Point === true) {

        parameters.push(B);

        name += 'Point';
    }

    if (parameters.indexOf(A) === -1
    && A instanceof Rectangle === true) {

        parameters.push(A);

        name += 'Rectangle';
    }

    if (parameters.indexOf(B) === -1
    && B instanceof Rectangle === true) {

        parameters.push(B);

        name += 'Rectangle';
    }

    return caller[name].apply(null, parameters);
}

function collidePointPoint(A, B) {

    if (A.x !== B.x
    || A.y !== B.y) {

        return false;
    }

    return true;
}

function collidePointRectangle(A, BCDE) {

    if (A.x < BCDE.x
    || A.x > BCDE.x + BCDE.width
    || A.y < BCDE.y
    || A.y > BCDE.y + BCDE.height) {

        return false;
    }

    return true;
}

function collideRectangleRectangle(ABCD, EFGH) {

    if (ABCD.x + ABCD.width < EFGH.x
    || ABCD.x > EFGH.x + EFGH.width
    || ABCD.y + ABCD.height < EFGH.y
    || ABCD.y > EFGH.y + EFGH.height) {

        return false;
    }

    return true;
}

// exports current module as a function
export {collide};
