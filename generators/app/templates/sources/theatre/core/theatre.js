import {Canvas} from 'core/canvas.js';
import {Loop} from 'core/loop.js';

import {preload} from 'core/preload.js';

function Theatre(config) {

    const {container} = config;

    const expose = config.expose || false;
    const framerate = config.framerate || 60;
    const sharp = config.sharp || false;
    const speed = config.speed || 1;

    const size = {

        'height' : container.offsetHeight,
        'width' : container.offsetWidth
    };

    let canvas = null;
    let loading = null;
    let restarting = false;
    let updates = 0;

    function assets() {

        const context = require.context('assets/', true, /\.[a-zA-Z0-9]+$/, 'lazy');

        preload(context, (assets) => {

            this.assets = {};

            assets.forEach((asset) => {

                const {getter, name, scope, source, type} = asset;

                if (typeof this.assets[type] === 'undefined') {

                    this.assets[type] = {};
                }

                if (typeof this.assets[type][scope] === 'undefined') {

                    this.assets[type][scope] = {};
                }

                this.assets[type][scope][name] = getter;
            });

            this.preloading = false;
        });

        if (typeof module.hot !== 'undefined') {

            module.hot.accept(context.id, () => {

                assets.call(this);
            });
        }

        this.preloading = true;
    }

    function forward(timeframe) {

        this.delta.update = timeframe;

        if (container.offsetWidth !== this.size.width
        || container.offsetHeight !== this.size.height) {

            resize.call(this);
        }

        if (this.playing === true) {

            this.tick();
        }

        this.scene.before.call(this);

        if (updates > 0) {

            update.call(this);
        }

        this.scene.render.call(this);
        this.scene.after.call(this);
    }

    function initialize() {

        canvas = new Canvas('2d', 'theatre', this.size.width, this.size.height, sharp);

        container.appendChild(canvas.element);

        canvas.focus();

        this.container = container;
        this.context = canvas.context;
        this.element = canvas.element;

        this.assets = {};
        this.delta = {};
        this.delta.render = 0;
        this.delta.update = 0;

        this.loop = new Loop(forward.bind(this), framerate, speed);

        scenes.call(this);

        this.scene = this.scenes.loading;
        this.scene.setup.call(this);
        this.scene.start.call(this);

        this.loop.update();

        assets.call(this);
    }

    function load(scene) {

        loading = scene;
    }

    function pause() {

        this.playing = false;
    }

    function play() {

        this.playing = true;
    }

    function resize() {

        this.size.width = container.offsetWidth;
        this.size.height = container.offsetHeight;

        canvas.resize(this.size.width, this.size.height);

        this.scene.resize.call(this);
    }

    function restart() {

        restarting = true;
    }

    function scenes() {

        const context = require.context('scenes/', true, /^\.\/[^\/]+\/index\.js$/, 'sync');

        context.keys().forEach((key) => {

            const name = key.match(/^\.\/([^\/]+)\/index\.js$/)[1];

            this.scenes[name] = context(key);
        });
    }

    function tick(times = 1) {

        updates += times;
    }

    function update() {

        while (updates > 0) {

            this.scene.update.call(this);

            updates -= 1;

            if (restarting === true) {

                this.scene.start.call(this);

                restarting = false;

                continue;
            }

            if (loading !== null) {

                this.scene.destroy.call(this);
                this.scene = this.scenes[loading];
                this.scene.setup.call(this);
                this.scene.start.call(this);

                loading = null;

                continue;
            }
        }
    }

    this.playing = true;
    this.preloading = false;
    this.scenes = {};
    this.size = size;
    this.state = {};
    this.version = '0.39.0';

    this.load = load;
    this.pause = pause;
    this.play = play;
    this.restart = restart;
    this.tick = tick;

    initialize.call(this, config);

    if (expose === true) {

        window.theatre = this;
    }
}

// exports current module as an object
export {Theatre};
