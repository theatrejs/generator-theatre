function Loop(framerate = 60, speed = 1) {

    let elapsedTime = 0;
    let lastUpdate = null;

    function update(handler) {

        const currentUpdate = performance.now();

        if (lastUpdate !== null) {

            // define elapsed time since last update
            elapsedTime += currentUpdate - lastUpdate;

            // call user's update handler matching timeframe, speed and fixing browser time handling
            while (elapsedTime >= 1000 / this.framerate / this.speed) {

                // define elapsed time since last user's update handler matching timeframe and speed
                elapsedTime -= 1000 / this.framerate / this.speed;

                handler(1000 / this.framerate);
            }
        }

        // call user's update handler on each available frame
        requestAnimationFrame(this.update.bind(this, handler));

        lastUpdate = currentUpdate;
    }

    this.framerate = framerate;
    this.speed = speed;

    this.update = update;
}

// exports current module as an object
export {Loop};
