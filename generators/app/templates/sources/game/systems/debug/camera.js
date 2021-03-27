function camera(entities) {

    const camera = this.$.camera;

    const width = 8;
    const size = width * 2;
    const offset = width / 2;

    this.context.save();

    this.context.lineWidth = width;
    this.context.strokeStyle = '#d95763';

    this.context.globalAlpha = 0.8;

    this.context.strokeRect(

        this.$.camera.screen.x() + offset,
        this.$.camera.screen.y() + offset,
        this.$.camera.screen.width() - width,
        this.$.camera.screen.height() - width
    );

    this.context.restore();
}

export {camera};
