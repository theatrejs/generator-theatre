function Images(parts) {

    this.name = 'images';

    this.parts = parts;

    this.parts.forEach((image) => {

        const {frame, framerate, frames, shift, size, source} = image;

        image.source = source;

        image.size = size || [32, 32];
        image.shift = shift || [0, 0];
        image.frames = frames || [[0, 0]];
        image.frame = frame || 0;
        image.framerate = framerate || 8;

        image.elapsed = 0;
    });
}

export {Images};
