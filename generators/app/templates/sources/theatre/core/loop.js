function Loop(framerate) {

    const timeframe = 1000 / framerate;

    let elapsedTime = 0;
    let framed = false;
    let lastRender = null;
    let lastUpdate = null;

    function render(handler) {

        const currentRender = Date.now();

        if (framed !== false) {

            handler(currentRender - lastRender);
        }

        // call user's render handler on each available frame
        requestAnimationFrame(this.render.bind(this, handler));

        framed = true;
        lastRender = currentRender;
    }

    function update(handler) {

        const currentUpdate = Date.now();

        if (lastUpdate !== null) {

            // define elapsed time since last update
            elapsedTime += currentUpdate - lastUpdate;
        }

        // call user's update handler matching timeframe and fixing browser time handling
        while (elapsedTime >= timeframe) {

            // define elapsed time since last user's update handler matching timeframe
            elapsedTime -= timeframe;

            handler(timeframe);
        }

        // call user's update handler matching timeframe
        setTimeout(this.update.bind(this, handler), timeframe);

        lastUpdate = currentUpdate;
    }

    this.render = render;
    this.update = update;
}

// exports current module as an object
export {Loop};
