function Loop(framerate = 60, speed = 1) {

    let elapsedTime = 0;
    let lastRender = null;
    let lastUpdate = null;

    function render(handler) {

        const currentRender = Date.now();

        if (lastRender !== null) {

            handler(currentRender - lastRender);
        }

        // call user's render handler on each available frame
        requestAnimationFrame(this.render.bind(this, handler));

        lastRender = currentRender;
    }

    function update(handler) {

        const currentUpdate = Date.now();

        if (lastUpdate !== null) {

            // define elapsed time since last update
            elapsedTime += currentUpdate - lastUpdate;
        }

        // call user's update handler matching timeframe, speed and fixing browser time handling
        while (elapsedTime >= 1000 / this.framerate / this.speed) {

            // define elapsed time since last user's update handler matching timeframe and speed
            elapsedTime -= 1000 / this.framerate / this.speed;

            handler(1000 / this.framerate);
        }

        lastUpdate = currentUpdate;

        // call update loop at least 60 times per second to quickly catch framerate or speed changes
        setTimeout(this.update.bind(this, handler), 1000 / Math.max(this.framerate, 60));
    }

    this.framerate = framerate;
    this.speed = speed;

    this.render = render;
    this.update = update;
}

// exports current module as an object
export {Loop};
