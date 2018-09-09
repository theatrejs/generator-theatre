function shuffle(array) {

    const length = array.length;

    // Fisher-Yates shuffle
    for (let iterator = 0; iterator < length; iterator += 1) {

        // define target randomized index from given array
        const target = Math.floor(Math.random() * (iterator + 1));

        // if target index is different of current iterator then switch values
        if (target !== iterator) {

            const temporary = array[iterator];

            // switch values
            array[iterator] = array[target];
            array[target] = temporary;
        }
    }

    // returns given array with mutation
    return array;
}

// exports current module as a function
export {shuffle};
