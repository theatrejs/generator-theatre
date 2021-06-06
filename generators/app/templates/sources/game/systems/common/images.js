function images(entities) {

    Object.entries(entities).forEach(([name, entity]) => {

        const camerasComponent = entity.get('cameras');
        const imagesComponent = entity.get('images');
        const positionComponent = entity.get('position');

        camerasComponent.forEach((camera) => {

            const $camera = this.$[camera.$camera.name];

            Object.entries(imagesComponent).forEach(([name, $spritesheet]) => {

                if (typeof $spritesheet.cache === 'undefined') {

                    $spritesheet.cache = this[$spritesheet.type][$spritesheet.scope][$spritesheet.name]();
                }

                const image = $spritesheet.cache;

                const {destination, frames, opacity, $source} = image;

                let [x, y, width, height] = frames[image.frame];

                $camera.add({

                    'source': this.assets[$source.type][$source.scope][$source.name](),
                    'frame': {

                        'x': width * x,
                        'y': height * y,
                        'width': width,
                        'height': height
                    },
                    'destination': {

                        'x': positionComponent.x + destination[0] - (destination[3] / 2),
                        'y': positionComponent.y + destination[1] - (destination[4] / 2),
                        'z': positionComponent.z + destination[2],
                        'width': destination[3],
                        'height': destination[4]
                    },
                    'opacity': camera.opacity * opacity * (entity.has('opacity') ? entity.get('opacity').opacity : 1)
                });
            });
        });
    });
}

export {images};
