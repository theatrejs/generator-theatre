function Fade(opacity, duration, $easing = false, $ending = false, elapsed = 0) {

    this.name = 'fade';

    this.duration = duration;
    this.$easing = $easing;
    this.elapsed = elapsed;
    this.$ending = $ending;
    this.fade = null
    this.faded = 0;
    this.opacity = opacity;
}

export {Fade};
