function Canvas(type, identifier, width, height) {

    const element = document.createElement('canvas');
    const context = element.getContext(type);

    function sharp() {

        this.element.style.imageRendering = '-moz-crisp-edges';
        this.element.style.imageRendering = '-webkit-crisp-edges';
        this.element.style.imageRendering = 'crisp-edges';
        this.element.style.imageRendering = 'pixelated';
        this.context.imageSmoothingEnabled = false;
    }

    element.setAttribute('id', identifier);
    element.setAttribute('height', height);
    element.setAttribute('width', width);

    this.context = context;
    this.element = element;
    this.sharp = sharp;
}

// exports current module as an object
export {Canvas};
