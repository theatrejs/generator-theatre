function Loop(handler, framerate = 60, speed = 1) {

    let elapsedTime = 0;
    let lastUpdate = null;
    let paused = false;

    function update() {

        const currentUpdate = performance.now();

        if (lastUpdate !== null
        && paused === false) {

            // define elapsed time since last update
            elapsedTime += currentUpdate - lastUpdate;

            // call user's update handler matching timeframe, speed and fixing browser time handling
            while (elapsedTime >= 1000 / this.framerate / this.speed
            && paused === false) {

                // define elapsed time since last user's update handler matching timeframe and speed
                elapsedTime -= 1000 / this.framerate / this.speed;

                handler(1000 / this.framerate);
            }
        }

        // call user's update handler on each available frame
        requestAnimationFrame(this.update.bind(this));

        lastUpdate = currentUpdate;
    }

    function pause() {

        paused = true;
    }

    function play() {

        paused = false;
    }

    function tick(times = 1) {

        // call user's update handler on each available frame
        requestAnimationFrame(() => {

            while (times--) {

                handler(1000 / this.framerate);
            }
        });
    }

    this.framerate = framerate;
    this.speed = speed;

    this.pause = pause;
    this.play = play;
    this.tick = tick;
    this.update = update;
}

// exports current module as an object
export {Loop};
