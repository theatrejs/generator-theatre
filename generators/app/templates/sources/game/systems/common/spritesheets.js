function spritesheets(entities) {

    Object.entries(entities).forEach(([name, entity]) => {

        const imagesComponent = entity.get('images');

        Object.entries(imagesComponent).forEach(([name, $spritesheet]) => {

            if (typeof $spritesheet.cache === 'undefined') {

                $spritesheet.cache = this[$spritesheet.type][$spritesheet.scope][$spritesheet.name]();
            }

            const image = $spritesheet.cache;

            const {framerate, frames} = image;

            if (frames.length > 1) {

                image.elapsed += this.delta;

                const duration = 1000 / framerate;

                while (image.elapsed >= duration) {

                    image.elapsed -= duration;
                    image.frame = (image.frame === frames.length - 1) ? 0 : image.frame + 1;
                }
            }
        });
    });
}

export {spritesheets};
