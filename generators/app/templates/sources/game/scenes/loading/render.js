function render() {

    // console.log('render loading scene');

    this.context.fillStyle = '#181a1f';
    this.context.fillRect(0, 0, this.size.width, this.size.height);

    if (this.preloaded === false) {

        this.context.font = '16px Courier New';
        this.context.textAlign = 'start';
        this.context.textBaseline = 'top';
        this.context.fillStyle = '#6b717d';
        this.context.fillText('/ Theatre', 8, 8);
        this.context.fillStyle = '#d7dae0';
        this.context.fillText('$ loading assets...', 8, 32);
    }
}

export {render};
