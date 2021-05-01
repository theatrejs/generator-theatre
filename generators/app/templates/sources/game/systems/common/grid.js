function grid() {

    const width = 1280;
    const height = 1280;

    this.$.camera.add({

        'source': this.assets.images.common['grid-' + width + 'x' + height](),
        'frame': {

            'x': 0,
            'y': 0,
            'width': width,
            'height': height
        },
        'destination': {

            'x': -width / 2,
            'y': -height / 2,
            'z': Number.NEGATIVE_INFINITY,
            'width': width,
            'height': height
        },
        'opacity': 1
    });
}

export {grid};
