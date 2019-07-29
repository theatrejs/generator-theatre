function Images(parts) {

    this.name = 'images';

    this.parts = parts;

    this.parts.forEach((image) => {

        const {destination, frame, framerate, frames, opacity, source} = image;

        image.source = source;

        image.frames = frames || [[0, 0, 32, 32]];
        image.frame = frame || 0;
        image.framerate = framerate || 8;
        image.destination = destination || [0, 0, 0, 32, 32];
        image.opacity = opacity || 1;

        image.elapsed = 0;
    });
}

export {Images};
