function images(entities) {

    Object.entries(entities).forEach(([name, entity]) => {

        const cameraComponent = entity.get('camera');
        const imagesComponent = entity.get('images');
        const positionComponent = entity.get('position');

        imagesComponent.parts.forEach((image) => {

            const {destination, frame, framerate, frames, opacity, source} = image;

            if (frames.length > 1) {

                image.elapsed += this.delta.render;

                const duration = 1000 / framerate;

                while (image.elapsed >= duration) {

                    image.elapsed -= duration;
                    image.frame = (frame === frames.length - 1) ? 0 : frame + 1;
                }
            }

            cameraComponent.camera.add({

                'source': source,
                'frame': {

                    'x': frames[image.frame][2] * frames[image.frame][0],
                    'y': frames[image.frame][3] * frames[image.frame][1],
                    'width': frames[image.frame][2],
                    'height': frames[image.frame][3]
                },
                'destination': {

                    'x': positionComponent.x + destination[0],
                    'y': positionComponent.y + destination[1],
                    'z': positionComponent.z + destination[2],
                    'width': destination[3],
                    'height': destination[4]
                },
                'opacity': cameraComponent.opacity * opacity
            });
        });
    });
}

export {images};
