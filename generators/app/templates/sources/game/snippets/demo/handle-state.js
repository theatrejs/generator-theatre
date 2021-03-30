export default function (entity, changes) {

    const state = entity.get('state').state;
    const part = entity.get('images')[0];

    const {elapsed, frame} = part.cache;

    switch ('' + state.UP + state.RIGHT + state.DOWN + state.LEFT) {

        case '0000':

            part.type = 'datasets';
            part.scope = 'demo';
            part.name = 'spritesheet-character-idle';
            part.cache = this.assets.datasets['demo']['spritesheet-character-idle']();
            part.cache.elapsed = elapsed;
            part.cache.frame = frame;

        break;

        case '1000':

            part.type = 'datasets';
            part.scope = 'demo';
            part.name = 'spritesheet-character-up';
            part.cache = this.assets.datasets['demo']['spritesheet-character-up']();
            part.cache.elapsed = elapsed;
            part.cache.frame = frame;

        break;

        case '1100':
        case '0100':
        case '0110':

            part.type = 'datasets';
            part.scope = 'demo';
            part.name = 'spritesheet-character-right';
            part.cache = this.assets.datasets['demo']['spritesheet-character-right']();
            part.cache.elapsed = elapsed;
            part.cache.frame = frame;

        break;

        case '0010':

            part.type = 'datasets';
            part.scope = 'demo';
            part.name = 'spritesheet-character-down';
            part.cache = this.assets.datasets['demo']['spritesheet-character-down']();
            part.cache.elapsed = elapsed;
            part.cache.frame = frame;

        break;

        case '0011':
        case '0001':
        case '1001':

            part.type = 'datasets';
            part.scope = 'demo';
            part.name = 'spritesheet-character-left';
            part.cache = this.assets.datasets['demo']['spritesheet-character-left']();
            part.cache.elapsed = elapsed;
            part.cache.frame = frame;

        break;
    }
};
