function images(entities) {

    Object.entries(entities).forEach(([name, entity]) => {

        const cameraComponent = entity.get('camera');
        const imagesComponent = entity.get('images');
        const positionComponent = entity.get('position');
        const zoneComponent = entity.get('zone');

        imagesComponent.parts.forEach((image) => {

            const {destination, frame, framerate, frames, opacity} = image;

            let {source} = image;

            if (frames.length > 1) {

                image.elapsed += this.delta.render;

                const duration = 1000 / framerate;

                while (image.elapsed >= duration) {

                    image.elapsed -= duration;
                    image.frame = (frame === frames.length - 1) ? 0 : frame + 1;
                }
            }

            let [x, y, width, height] = frames[image.frame];

            if (typeof source === 'undefined') {

                source = this.assets.images.common.placeholder();

                x = x % 8;
                y = y % 1;
                width = 1;
                height = 1;
            }

            cameraComponent.camera.add({

                'source': source,
                'frame': {

                    'x': width * x,
                    'y': height * y,
                    'width': width,
                    'height': height
                },
                'destination': {

                    'x': Math.floor((positionComponent.x + destination[0]) * zoneComponent.frame.scale + zoneComponent.frame.x),
                    'y': Math.floor((positionComponent.y + destination[1]) * zoneComponent.frame.scale + zoneComponent.frame.y),
                    'z': Math.floor(positionComponent.z + destination[2] + zoneComponent.frame.z),
                    'width': (destination[3] * zoneComponent.frame.scale),
                    'height': (destination[4] * zoneComponent.frame.scale)
                },
                'opacity': cameraComponent.opacity * opacity
            });
        });
    });
}

export {images};
