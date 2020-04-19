function debug(entities) {

    this.$.controllers.inputs.forEach((input) => {

        this.snippets.demo['handle-debug-inputs'](input);
    });

    Object.entries(entities).forEach(([name, entity]) => {

        if (entity.has(['camera', 'images', 'origin', 'position']) === true
        && entity.get('camera').opacity > 0) {

            const imagesComponent = entity.get('images');

            imagesComponent.parts.forEach((spritesheet) => {

                this.snippets.demo['handle-debug-spritesheet'](spritesheet, entity);
            });
        }
    });

    if (this.playing === false) {

        this.snippets.demo['draw-debug-pause']();
    }
}

export {debug};
