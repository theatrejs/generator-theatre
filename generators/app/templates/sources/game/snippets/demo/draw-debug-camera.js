export default function (camera) {

    const width = 8;
    const offset = width / 2;

    this.context.save();

    this.context.lineWidth = width;
    this.context.font = 'bold 16px Courier New';
    this.context.textAlign = 'start';
    this.context.textBaseline = 'top';

    this.context.fillStyle = '#d95763';

    this.context.fillText(

        'camera \'' + camera.name + '\'',
        camera.screen.x() + camera.screen.width() - 16 - this.context.measureText('camera \'' + camera.name + '\'').width,
        camera.screen.y() + 16
    );

    this.context.strokeStyle = '#d95763';

    this.context.strokeRect(

        this.$.camera.screen.x() + offset,
        this.$.camera.screen.y() + offset,
        this.$.camera.screen.width() - width,
        this.$.camera.screen.height() - width
    );

    this.context.restore();
};
