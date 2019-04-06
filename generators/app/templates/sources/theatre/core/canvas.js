function Canvas(type, identifier, width, height) {

    const element = document.createElement('canvas');
    const context = element.getContext(type);
    const ratio = window.devicePixelRatio || 1;

    function sharp() {

        this.element.style.imageRendering = '-moz-crisp-edges';
        this.element.style.imageRendering = '-webkit-crisp-edges';
        this.element.style.imageRendering = 'crisp-edges';
        this.element.style.imageRendering = 'pixelated';
        this.context.imageSmoothingEnabled = false;
    }

    element.setAttribute('id', identifier);
    element.setAttribute('height', ratio * height);
    element.setAttribute('width', ratio * width);

    element.style.height = height + 'px';
    element.style.width = width + 'px';

    context.scale(ratio, ratio);

    this.context = context;
    this.element = element;
    this.sharp = sharp;
}

// exports current module as an object
export {Canvas};
