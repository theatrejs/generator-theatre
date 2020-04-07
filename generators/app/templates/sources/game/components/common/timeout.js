function Timeout(duration, ending = false) {

    this.name = 'timeout';

    this.duration = duration;
    this.elapsed = 0;
    this.ending = ending;
}

export {Timeout};
