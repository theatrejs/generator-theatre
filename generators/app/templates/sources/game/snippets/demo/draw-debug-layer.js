export default function (entity, spritesheet) {

    this.context.save();

    const width = 2;
    const offset = width / 2;

    this.context.lineWidth = width;
    this.context.font = 'bold 16px Courier New';
    this.context.textAlign = 'start';
    this.context.textBaseline = 'top';

    this.context.fillStyle = '#222034';

    let layer = this.context.measureText('entity \'' + entity.name + '\'').width;

    if (spritesheet.height >= 32) layer = Math.max(this.context.measureText('entity \'' + entity + '\'').width, this.context.measureText('spritesheet \'' + spritesheet.name + '\'').width);

    this.context.fillRect(spritesheet.x + spritesheet.width, spritesheet.y - 16, layer + 32, spritesheet.height + 32);
    this.context.fillRect(spritesheet.x - 16, spritesheet.y - 16, spritesheet.width + 16, 16);
    this.context.fillRect(spritesheet.x - 16, spritesheet.y, 16, spritesheet.height);
    this.context.fillRect(spritesheet.x - 16, spritesheet.y + spritesheet.height, spritesheet.width + 16, 16);

    this.context.fillStyle = 'white';

    this.context.fillText('entity \'' + entity.name + '\'', spritesheet.x + spritesheet.width + 16, spritesheet.y);
    if (spritesheet.height >= 32) this.context.fillText('spritesheet \'' + spritesheet.name + '\'', spritesheet.x + spritesheet.width + 16, spritesheet.y + 16);
    if (spritesheet.height >= 48) this.context.fillText('frame #' + (spritesheet.frame + 1), spritesheet.x + spritesheet.width + 16, spritesheet.y + 16 * 2);
    if (spritesheet.height >= 64) this.context.fillText(spritesheet.framerate + 'fps', spritesheet.x + spritesheet.width + 16, spritesheet.y + 16 * 3);

    this.context.restore();
};
