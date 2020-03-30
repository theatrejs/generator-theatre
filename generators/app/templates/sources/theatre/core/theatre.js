import {Canvas} from 'core/canvas.js';
import {Loop} from 'core/loop.js';

import {preload} from 'core/preload.js';

function Theatre(config) {

    const {container, scenes} = config;

    const expose = config.expose || false;
    const framerate = config.framerate || 60;
    const sharp = config.sharp || false;
    const speed = config.speed || 1;

    const size = {

        'height' : container.offsetHeight,
        'width' : container.offsetWidth
    };

    let loading = null;
    let restarting = false;

    function assets() {

        const context = require.context('assets/', true, /\.[a-zA-Z0-9]+$/, 'lazy');

        preload(context, (assets) => {

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

        this.preloading = true;
    }

    function initialize() {

        const canvas = new Canvas('2d', 'theatre', this.size.width, this.size.height, sharp);

        container.appendChild(canvas.element);

        this.container = container;
        this.context = canvas.context;
        this.element = canvas.element;

        this.assets = {};
        this.delta = {};
        this.delta.render = 0;
        this.delta.update = 0;

        this.loop = new Loop(framerate, speed);

        this.scene = this.scenes.loading;
        this.scene.setup.call(this);
        this.scene.start.call(this);

        this.loop.update((timeframe) => {

            this.delta.update = timeframe;

            if (container.offsetWidth !== this.size.width
            || container.offsetHeight !== this.size.height) {

                this.size.width = container.offsetWidth;
                this.size.height = container.offsetHeight;

                canvas.resize(this.size.width, this.size.height);

                this.scene.resize.call(this);
            }

            this.scene.update.call(this);

            if (restarting === true) {

                this.scene.start.call(this);

                restarting = false;

                return;
            }

            if (loading !== null) {

                this.scene.destroy.call(this);
                this.scene = this.scenes[loading];
                this.scene.setup.call(this);
                this.scene.start.call(this);

                loading = null;

                return;
            }
        });

        this.loop.render((timeframe) => {

            this.delta.render = timeframe;

            this.scene.render.call(this);
        });

        assets.call(this);
    }

    function load(scene) {

        loading = scene;
    }

    function restart() {

        restarting = true;
    }

    this.preloading = false;
    this.scenes = scenes;
    this.size = size;
    this.state = {};
    this.version = '0.36.0';

    this.load = load;
    this.restart = restart;

    initialize.call(this, config);

    if (expose === true) {

        window.theatre = this;
    }
}

// exports current module as an object
export {Theatre};
