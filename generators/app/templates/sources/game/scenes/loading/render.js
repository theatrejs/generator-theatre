function render() {

    // console.log('lifecycle :', 'render loading scene');

    this.context.fillStyle = '#222034';
    this.context.fillRect(0, 0, this.size.width, this.size.height);

    this.context.font = '16px Courier New';
    this.context.textAlign = 'start';
    this.context.textBaseline = 'top';
    this.context.fillStyle = '#ffffff';
    this.context.fillText('/ Theatre', 8, 8);
    this.context.fillStyle = '#cbdbfc';

    this.context.fillText('$ preloading assets...', 8, 32);

    if (this.preloading === false) {

        this.context.fillStyle = '#99e550';
        this.context.fillText('$ preloading completed', 8, 32 + 24);
        this.context.fillStyle = '#cbdbfc';
        this.context.fillText('$ loading demo scene...', 8, 32 + 24 + 24);
    }
}

export {render};
