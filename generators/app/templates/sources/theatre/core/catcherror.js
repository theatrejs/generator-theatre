function catcherror(catchable, handler) {

    return function (...params) {

        try {

            return catchable.call(this, ...params);
        }

        catch (error) {

            console.error(error);

            if (typeof handler === 'function') {

                handler.call(this);
            }
        }
    };
}

// exports current module as a function
export {catcherror};
