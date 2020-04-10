function spritesheets(entities) {

    Object.entries(entities).forEach(([name, entity]) => {

        const imagesComponent = entity.get('images');

        imagesComponent.parts.forEach((image) => {

            const {framerate, frames} = image;

            if (frames.length > 1) {

                image.elapsed += this.delta.update;

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
