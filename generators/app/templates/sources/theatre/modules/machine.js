function Machine(map) {

    let current = null;

    function handle(message) {

        // if message is not handled by the current state of the machine then ignore it
        if (map[current].hasOwnProperty(message) !== true
        || map.hasOwnProperty(map[current][message]) !== true) {

            return null;
        }

        // update the current state of the machine
        current = map[current][message];

        return current;
    }

    function initialize(state) {

        if (map.hasOwnProperty(state) === true) {

            // define the initial state of the machine
            current = state;
        }
    }

    function state() {

        // retrieve the current state of the machine
        return current;
    }

    this.handle = handle;
    this.initialize = initialize;
    this.state = state;
}

// exports current module as an object
export {Machine};
