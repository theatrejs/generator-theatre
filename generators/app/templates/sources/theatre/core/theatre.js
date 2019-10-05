import {Canvas} from 'core/canvas.js';
import {Loop} from 'core/loop.js';

import {preload} from 'core/preload.js';

function Theatre(config) {

    const {assets, container, scenes, size} = config;

    const expose = config.expose || false;
    const framerate = config.framerate || 60;
    const sharp = config.sharp || false;
    const speed = config.speed || 1;

    let loading = null;
    let restarting = false;

    function initialize() {

        const canvas = new Canvas('2d', 'theatre', this.size.width, this.size.height);

        if (sharp === true) {

            canvas.sharp();
        }

        container.appendChild(canvas.element);

        this.container = container;
        this.context = canvas.context;
        this.element = canvas.element;

        this.assets = {};
        this.delta = {};
        this.delta.render = 0;
        this.delta.update = 0;

        this.scene = this.scenes.loading;
        this.scene.setup.call(this);
        this.scene.start.call(this);

        const loop = new Loop(framerate, speed);

        loop.update((timeframe) => {

            this.delta.update = timeframe;
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

        loop.render((timeframe) => {

            this.delta.render = timeframe;
            this.scene.render.call(this);
        });

        preload(assets, (assets) => {

            assets.forEach((asset) => {

                if (typeof this.assets[asset.type + 's'] === 'undefined') {

                    this.assets[asset.type + 's'] = {};
                }

                if (typeof this.assets[asset.type + 's'][asset.scope] === 'undefined') {

                    this.assets[asset.type + 's'][asset.scope] = {};
                }

                this.assets[asset.type + 's'][asset.scope][asset.name] = asset.getter;
            });

            this.preloading = false;
        });

        this.loop = loop;
        this.preloading = true;
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
    this.version = '0.32.0';

    this.load = load;
    this.restart = restart;

    initialize.call(this, config);

    if (expose === true) {

        window.theatre = this;
    }
}

// exports current module as an object
export {Theatre};
