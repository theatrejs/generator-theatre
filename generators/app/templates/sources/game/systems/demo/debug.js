function debug(entities) {

    this.$.controllers.inputs.forEach((input) => {

        this.snippets.demo['handle-debug-inputs'](input);
    });

    Object.entries(entities).forEach(([name, entity]) => {

        if (entity.has(['cameras', 'hitbox', 'origin', 'position']) === true) {

            this.snippets.demo['draw-debug-hitbox'](entity);
        }
    });

    this.snippets.demo['draw-debug-camera'](this.$.camera);

    Object.entries(entities).forEach(([name, entity]) => {

        if (entity.has(['cameras', 'images', 'origin', 'position']) === true) {

            const imagesComponent = entity.get('images');

            imagesComponent.forEach((spritesheet) => {

                this.snippets.demo['handle-debug-spritesheet'](spritesheet, entity);
            });
        }
    });

    if (this.playing === false) {

        this.snippets.demo['draw-debug-pause']();
    }
}

export {debug};
