function text(entities) {

    Object.entries(entities).forEach(([name, entity]) => {

        const camerasComponent = entity.get('cameras');
        const textComponent = entity.get('text');
        const positionComponent = entity.get('position');

        const {$font, anchor, destination, lines, opacity} = textComponent;

        let [x, y, z, width, height] = destination;

        const $spritesheet = this.assets[$font.type][$font.scope][$font.name]();
        const {$source, map, size} = $spritesheet;
        const font = this.assets[$source.type][$source.scope][$source.name]();

        camerasComponent.forEach((camera) => {

            const $camera = this.$[camera.$camera.name];

            lines.forEach((line, row) => {

                let horizontal = 0;
                let vertical = 0;

                switch (anchor.horizontal) {

                    case 'left':

                        horizontal = 0;

                    break;

                    case 'center':
                    case 'middle':

                        horizontal = -(destination[3] * line.length / 2);

                    break;

                    case 'right':

                        horizontal = -(destination[3] * line.length);

                    break;
                }

                switch (anchor.vertical) {

                    case 'top':

                        vertical = 0;

                    break;

                    case 'center':
                    case 'middle':

                        vertical = -((destination[4] * lines.length) / 2);

                    break;

                    case 'bottom':

                        vertical = -destination[4] * lines.length;

                    break;
                }

                Array.from(line).forEach((character, column) => {

                    let posX = -1;
                    let posY = -1;

                    map.forEach((characters, index) => {

                        if (posX === -1) {

                            posX = characters.indexOf(character);
                            posY = index;
                        }
                    });

                    if (posX === -1) {

                        return;
                    }

                    $camera.add({

                        'source': font,
                        'frame': {

                            'x': posX * size[0],
                            'y': posY * size[1],
                            'width': size[0],
                            'height': size[1]
                        },
                        'destination': {

                            'x': positionComponent.x + destination[0] + horizontal + (destination[3] * column),
                            'y': positionComponent.y + destination[1] + vertical + (destination[4] * row),
                            'z': positionComponent.z + destination[2],
                            'width': destination[3],
                            'height': destination[4]
                        },
                        'opacity': camera.opacity * opacity * (entity.has('opacity') ? entity.get('opacity').opacity : 1)
                    });
                });
            });
        });
    });
}

export {text};
