function camera(entities) {

    const camera = this.$.camera;

    const width = 2 * camera.screen.scale();
    const size = width * 2;
    const offset = width / 2;

    this.context.save();

    this.context.lineWidth = width;
    this.context.font = 'bold ' + size + 'px Courier New';
    this.context.textAlign = 'start';
    this.context.textBaseline = 'top';

    this.context.fillStyle = '#d95763';

    this.context.fillText(

        'camera \'' + camera.name + '\'',
        camera.screen.x() + camera.screen.width() - size - this.context.measureText('camera \'' + camera.name + '\'').width,
        camera.screen.y() + size
    );

    this.context.strokeStyle = '#d95763';

    this.context.strokeRect(

        this.$.camera.screen.x() + offset,
        this.$.camera.screen.y() + offset,
        this.$.camera.screen.width() - width,
        this.$.camera.screen.height() - width
    );

    this.context.restore();
}

export {camera};
