function Canvas(type, identifier, width, height, pixelated = false) {

    const element = document.createElement('canvas');
    const context = element.getContext(type);

    function focus() {

        element.setAttribute('tabindex', 0);
        element.focus();
    }

    function resize(width, height) {

        let ratio = window.devicePixelRatio || 1;

        if (pixelated === true) {

            ratio = Math.floor(ratio);
        }

        element.setAttribute('height', ratio * height);
        element.setAttribute('width', ratio * width);

        element.style.height = height + 'px';
        element.style.width = width + 'px';

        context.scale(ratio, ratio);

        if (pixelated === true) {

            sharp();
        }
    }

    function sharp() {

        element.style.imageRendering = '-moz-crisp-edges';
        element.style.imageRendering = '-webkit-crisp-edges';
        element.style.imageRendering = 'crisp-edges';
        element.style.imageRendering = 'pixelated';
        context.imageSmoothingEnabled = false;
    }

    element.setAttribute('id', identifier);
    element.addEventListener('mousedown', focus);

    resize(width, height);

    this.context = context;
    this.element = element;
    this.focus = focus;
    this.resize = resize;
}

// exports current module as an object
export {Canvas};
