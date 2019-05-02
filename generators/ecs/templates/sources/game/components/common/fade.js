import * as Ease from 'modules/ease.js';

function Fade(opacity, duration, easing = Ease.linear(1), ending = false) {

    this.name = 'fade';

    this.duration = duration;
    this.easing = easing;
    this.elapsed = 0;
    this.ending = ending;
    this.fade = null
    this.faded = 0;
    this.opacity = opacity;
}

export {Fade};
