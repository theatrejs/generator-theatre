function images(entities) {

    Object.entries(entities).forEach(([name, entity]) => {

        const cameraComponent = entity.get('camera');
        const imagesComponent = entity.get('images');
        const originComponent = entity.get('origin');
        const positionComponent = entity.get('position');

        imagesComponent.parts.forEach((image) => {

            const {destination, frames, opacity, $source} = image;
            const $camera = this.$[cameraComponent.$camera.name];
            const $origin = this.$[originComponent.$origin.name];

            let [x, y, width, height] = frames[image.frame];
            let data;

            try {

                data = this.assets[$source.type][$source.scope][$source.name]();
            }
            catch (error) {

                x = x % 8;
                y = y % 1;
                width = 1;
                height = 1;

                data = this.assets.images.common['placeholder-8x1']();
            }

            $camera.add({

                'source': data,
                'frame': {

                    'x': width * x,
                    'y': height * y,
                    'width': width,
                    'height': height
                },
                'destination': {

                    'x': Math.floor((positionComponent.x + destination[0]) * $origin.scale() + $origin.x()),
                    'y': Math.floor((positionComponent.y + destination[1]) * $origin.scale() + $origin.y()),
                    'z': Math.floor(positionComponent.z + destination[2] + $origin.z()),
                    'width': (destination[3] * $origin.scale()),
                    'height': (destination[4] * $origin.scale())
                },
                'opacity': cameraComponent.opacity * opacity
            });
        });
    });
}

export {images};
