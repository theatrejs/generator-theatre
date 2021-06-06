import {Canvas} from 'core/canvas.js';
import {Loop} from 'core/loop.js';

import {catcherror} from 'core/catcherror.js';
import {preload} from 'core/preload.js';

function Theatre(config) {

    const {container} = config;

    const debug = config.debug || false;
    const expose = config.expose || false;
    const framerate = config.framerate || 60;
    const panic = config.panic || 4000;
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

    function components() {

        const context = require.context('components/', true, /^\.\/[^\/]+\.json$/, 'sync');

        this.components = {};

        context.keys().forEach((key) => {

            const name = key.match(/^\.\/([^\/]+)\.json$/)[1];
            const component = context(key);
            const getter = () => JSON.parse(JSON.stringify(component));

            this.components[name] = getter;
        });

        if (typeof module.hot !== 'undefined') {

            module.hot.accept(context.id, () => {

                components.call(this);
                entities.call(this);
                pools.call(this);
            });
        }
    }

    function entities() {

        const context = require.context('entities/', true, /^\.\/([^\/]+)\/([^\/]+)\.json$/, 'sync');

        this.entities = {};

        context.keys().forEach((key) => {

            const [path, scope, name] = key.match(/^\.\/([^\/]+)\/([^\/]+)\.json$/);

            if (typeof this.entities[scope] === 'undefined') {

                this.entities[scope] = {};
            }

            if (typeof this.entities[scope][name] === 'undefined') {

                this.entities[scope][name] = {};
            }

            const entity = JSON.parse(JSON.stringify(context(key)));

            if (entity.hasOwnProperty('components') === false) {

                entity.components = [];
            }

            const getter = () => JSON.parse(JSON.stringify(entity));

            this.entities[scope][name] = getter;
        });

        if (typeof module.hot !== 'undefined') {

            module.hot.accept(context.id, () => {

                entities.call(this);
                pools.call(this);
            });
        }
    }

    function forward(timeframe, panic) {

        this.delta = timeframe;

        if (container.offsetWidth !== this.size.width
        || container.offsetHeight !== this.size.height) {

            resize.call(this);
        }

        if (this.playing === true) {

            this.tick();
        }

        this.scene.before.call(this);

        if (updates > 0) {

            update.call(this, panic);
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
        this.delta = 0;

        this.loop = new Loop(forward.bind(this), framerate, speed, panic);

        assets.call(this);
        components.call(this);
        entities.call(this);
        partials.call(this);
        pools.call(this);
        scenes.call(this);
        snippets.call(this);
        systems.call(this);

        this.scene = this.scenes.loading;
        this.scene.setup.call(this);
        this.scene.start.call(this);

        this.loop.update();
    }

    function load(scene) {

        if (this.debug === true) {

            console.warn('debugging :', 'load scene', '(' + this.loop.framerate + 'fps @' + this.loop.speed + 'x)');
        }

        loading = scene;
    }

    function partials() {

        const context = require.context('partials/', true, /^\.\/([^\/]+)\/([^\/]+)\.json$/, 'sync');

        this.partials = {};

        context.keys().forEach((key) => {

            const [path, scope, name] = key.match(/^\.\/([^\/]+)\/([^\/]+)\.json$/);

            if (typeof this.partials[scope] === 'undefined') {

                this.partials[scope] = {};
            }

            if (typeof this.partials[scope][name] === 'undefined') {

                this.partials[scope][name] = {};
            }

            const partial = context(key);
            const getter = () => JSON.parse(JSON.stringify(partial));

            this.partials[scope][name] = getter;
        });

        if (typeof module.hot !== 'undefined') {

            module.hot.accept(context.id, () => {

                partials.call(this);
            });
        }
    }

    function pause() {

        if (this.debug === true) {

            console.warn('debugging :', 'pause scene', '(' + this.loop.framerate + 'fps @' + this.loop.speed + 'x)');
        }

        this.playing = false;
    }

    function play() {

        if (this.debug === true) {

            console.warn('debugging :', 'play scene', '(' + this.loop.framerate + 'fps @' + this.loop.speed + 'x)');
        }

        this.playing = true;
    }

    function pools() {

        const context = require.context('pools/', true, /^\.\/([^\/]+)\/([^\/]+)\.json$/, 'sync');

        this.pools = {};

        context.keys().forEach((key) => {

            const [path, scope, name] = key.match(/^\.\/([^\/]+)\/([^\/]+)\.json$/);

            if (typeof this.pools[scope] === 'undefined') {

                this.pools[scope] = {};
            }

            if (typeof this.pools[scope][name] === 'undefined') {

                this.pools[scope][name] = {};
            }

            const pools = JSON.parse(JSON.stringify(context(key)));

            pools.forEach((entity) => {

                if (entity.hasOwnProperty('entity') === false
                || typeof entity.entity.scope !== 'string'
                || typeof entity.entity.name !== 'string') {

                    return;
                }

                if (entity.hasOwnProperty('components') === false) {

                    entity.components = [];
                }

                const components = this.entities[entity.entity.scope][entity.entity.name]().components;

                entity.components = components.concat(entity.components);

                delete entity.entity;
            });

            const getter = () => JSON.parse(JSON.stringify(pools));

            this.pools[scope][name] = getter;
        });

        if (typeof module.hot !== 'undefined') {

            module.hot.accept(context.id, () => {

                pools.call(this);
            });
        }
    }

    function resize() {

        this.size.width = container.offsetWidth;
        this.size.height = container.offsetHeight;

        canvas.resize(this.size.width, this.size.height);

        this.scene.resize.call(this);
    }

    function restart() {

        if (this.debug === true) {

            console.warn('debugging :', 'restart scene', '(' + this.loop.framerate + 'fps @' + this.loop.speed + 'x)');
        }

        restarting = true;
    }

    function scenes() {

        const context = require.context('scenes/', true, /^\.\/([^\/]+)\/index\.js$/, 'sync');

        this.scenes = {};

        context.keys().forEach((key) => {

            const [path, name] = key.match(/^\.\/([^\/]+)\/index\.js$/);

            this.scenes[name] = context(key);
        });

        if (typeof module.hot !== 'undefined') {

            module.hot.accept(context.id, () => {

                scenes.call(this);
            });
        }
    }

    function snippets() {

        const context = require.context('snippets/', true, /^\.\/([^\/]+)\/([^\/]+)\.js$/, 'sync');

        this.snippets = {};

        context.keys().forEach((key) => {

            const [path, scope, name] = key.match(/^\.\/([^\/]+)\/([^\/]+)\.js$/);

            if (typeof this.snippets[scope] === 'undefined') {

                this.snippets[scope] = {};
            }

            if (typeof this.snippets[scope][name] === 'undefined') {

                this.snippets[scope][name] = {};
            }

            let snippet = context(key).default;

            if (this.debug === true) {

                snippet = catcherror(snippet, this.pause);
            }

            this.snippets[scope][name] = snippet.bind(this);
        });

        if (typeof module.hot !== 'undefined') {

            module.hot.accept(context.id, () => {

                snippets.call(this);
            });
        }
    }

    function systems() {

        const context = require.context('systems/', true, /^\.\/([^\/]+)\/([^\/]+)\.js$/, 'sync');

        this.systems = {};

        context.keys().forEach((key) => {

            const [path, scope, name] = key.match(/^\.\/([^\/]+)\/([^\/]+)\.js$/);

            if (typeof this.systems[scope] === 'undefined') {

                this.systems[scope] = {};
            }

            if (typeof this.systems[scope][name] === 'undefined') {

                this.systems[scope][name] = {};
            }

            this.systems[scope][name] = context(key)[name];
        });

        if (typeof module.hot !== 'undefined') {

            module.hot.accept(context.id, () => {

                systems.call(this);
            });
        }
    }

    function tick(times = 1) {

        if (this.debug === true
        && this.playing === false) {

            console.warn('debugging :', 'tick scene', '(' + (Math.round(this.delta * 100) / 100) + 'ms @' + this.loop.speed + 'x)');
        }

        updates += times;
    }

    function update(panic) {

        while (updates > 0) {

            if (panic === true) {

                this.scene.panic.call(this);
            }

            else {

                this.scene.update.call(this);
            }

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

    this.$ = {};
    this.components = {};
    this.debug = debug
    this.entities = {};
    this.events = [];
    this.partials = {};
    this.playing = true;
    this.pools = {};
    this.precision = 3;
    this.preloading = false;
    this.scenes = {};
    this.size = size;
    this.snippets = {};
    this.systems = {};
    this.version = '0.47.0';

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
