function images(entity) {

    const imagesComponent = entity.get('images');
    const positionComponent = entity.get('position');

    imagesComponent.parts.forEach((image) => {

        const {frame, framerate, frames, shift, size, source} = image;

        if (frames.length > 1) {

            image.elapsed += this.delta.render;

            const duration = 1000 / framerate;

            while (image.elapsed >= duration) {

                image.elapsed -= duration;
                image.frame = (frame === frames.length - 1) ? 0 : frame + 1;
            }
        }

        this.context.drawImage(

            source,
            size[0] * frames[image.frame][0], size[1] * frames[image.frame][1], size[0], size[1],
            positionComponent.x + shift[0], positionComponent.y + shift[1], size[0], size[1]
        );
    });
}

export {images};
