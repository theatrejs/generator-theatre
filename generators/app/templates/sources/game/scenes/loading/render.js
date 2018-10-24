function render() {

    // console.log('render loading scene');

    this.context.fillStyle = '#181a1f';
    this.context.fillRect(0, 0, this.size.width, this.size.height);

    this.context.font = '16px Courier New';
    this.context.textAlign = 'start';
    this.context.textBaseline = 'top';
    this.context.fillStyle = '#6b717d';
    this.context.fillText('/ Theatre', 8, 8);
    this.context.fillStyle = '#d7dae0';

    this.context.fillText('$ preloading assets...', 8, 32);

    if (this.preloading === false) {

        this.context.fillText('$ preloading completed', 8, 32 + 24);
        this.context.fillText('$ loading demo scene...', 8, 32 + 24 + 24);
    }
}

export {render};
