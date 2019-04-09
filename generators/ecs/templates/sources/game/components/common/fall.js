function Fall(height, duration, easing) {

    this.name = 'fall';

    this.duration = duration;
    this.easing = easing;
    this.elapsed = 0;
    this.height = height;
    this.moved = 0;
}

export {Fall};
