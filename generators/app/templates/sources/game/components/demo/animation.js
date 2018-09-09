function Animation(frames, framerate) {

    this.name = 'animation';

    this.framerate = framerate || 8;
    this.frames = frames;

    this.frame = 0;
    this.current = this.frames[this.frame];
    this.elapsed = 0;
}

export {Animation};
