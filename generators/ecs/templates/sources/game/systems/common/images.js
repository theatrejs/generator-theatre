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

        this.camera.add({

            'source': source,
            'frame': {

                'x': size[0] * frames[image.frame][0],
                'y': size[1] * frames[image.frame][1],
                'width': size[0],
                'height': size[1]
            },
            'position': {

                'x': positionComponent.x + shift[0],
                'y': positionComponent.y + shift[1],
                'z': positionComponent.z + shift[2]
            }
        });
    });
}

export {images};
