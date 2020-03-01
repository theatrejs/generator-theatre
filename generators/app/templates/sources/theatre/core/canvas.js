function Canvas(type, identifier, width, height) {

    const element = document.createElement('canvas');
    const context = element.getContext(type);
    const ratio = window.devicePixelRatio || 1;

    function resize(width, height) {

        element.setAttribute('height', ratio * height);
        element.setAttribute('width', ratio * width);

        element.style.height = height + 'px';
        element.style.width = width + 'px';

        context.scale(ratio, ratio);
    }

    function sharp() {

        element.style.imageRendering = '-moz-crisp-edges';
        element.style.imageRendering = '-webkit-crisp-edges';
        element.style.imageRendering = 'crisp-edges';
        element.style.imageRendering = 'pixelated';
        context.imageSmoothingEnabled = false;
    }

    element.setAttribute('id', identifier);

    resize(width, height);

    this.context = context;
    this.element = element;
    this.resize = resize;
    this.sharp = sharp;
}

// exports current module as an object
export {Canvas};
