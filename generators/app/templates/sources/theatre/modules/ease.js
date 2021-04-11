function easeIn(power) {

    // accelerating from zero velocity
    return (x) => x ** power;
}

function easeInFollow(power) {

    // accelerating from zero velocity, then follow constant velocity
    return (x) => {

        if (x <= 1) {

            return easeIn(power)(x);
        }

        return 1 - linear(power)(1 - x);
    };
}

function easeInOut(power) {

    // acceleration until halfway, then deceleration (with x in [0, 1] range)
    return (x) => {

        if (x < 0.5) {

            return easeIn(power)(2 * x) / 2
        }

        return 1 - easeInOut(power)(1 - x)
    };
}

function easeOut(power) {

    // decelerating to zero velocity
    return (x) => {

        if (x > 1) {

            x = 1;
        }

        return 1 - easeIn(power)(1 - x);
    };
}

function linear(factor) {

    // linear progression
    return (x) => x * factor;
}

function easeInQuad(x) {

    // accelerating from zero velocity
    return easeIn(2)(x);
}

function easeInQuadFollow(x) {

    // accelerating from zero velocity, then follow constant velocity
    return easeInFollow(2)(x);
}

function easeInCubic(x) {

    // accelerating from zero velocity
    return easeIn(3)(x);
}

function easeInCubicFollow(x) {

    // accelerating from zero velocity, then follow constant velocity
    return easeInFollow(3)(x);
}

function easeInQuart(x) {

    // accelerating from zero velocity
    return easeIn(4)(x);
}

function easeInQuartFollow(x) {

    // accelerating from zero velocity, then follow constant velocity
    return easeInFollow(4)(x);
}

function easeInOutQuad(x) {

    // acceleration until halfway, then deceleration (with x in [0, 1] range)
    return easeInOut(2)(x);
}

function easeInOutCubic(x) {

    // acceleration until halfway, then deceleration (with x in [0, 1] range)
    return easeInOut(3)(x);
}

function easeInOutQuart(x) {

    // acceleration until halfway, then deceleration (with x in [0, 1] range)
    return easeInOut(4)(x);
}

function easeOutQuad(x) {

    // decelerating to zero velocity (with x in [0, 1] range)
    return easeOut(2)(x);
}

function easeOutCubic(x) {

    // decelerating to zero velocity (with x in [0, 1] range)
    return easeOut(3)(x);
}

function easeOutQuart(x) {

    // decelerating to zero velocity (with x in [0, 1] range)
    return easeOut(4)(x);
}

function reverse(handler) {

    // reversing easing function
    return (x) => {

        if (x > 1) {

            x = 1;
        }

        return handler(1 - x);
    };
}

// exports current module as functions
export {

    // export ease function creators
    easeIn, easeInFollow, easeInOut, easeOut, linear,

    // export ease-in functions
    easeInCubic, easeInCubicFollow, easeInQuad, easeInQuadFollow, easeInQuart, easeInQuartFollow,

    // export ease-in-out functions
    easeInOutCubic, easeInOutQuad, easeInOutQuart,

    // export ease-out functions
    easeOutCubic, easeOutQuad, easeOutQuart,

    // export utility functions
    reverse
};
