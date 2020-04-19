export default function () {

    this.context.save();

    const left = 4;
    const width = 8;
    const offset = width / 2;

    this.context.lineWidth = width;

    this.context.fillStyle = '#222034';

    this.context.fillRect(32 - 16, 32 - 16, 32 + 2 * 16, 32 + 2 * 16);

    this.context.strokeStyle = 'white';

    this.context.beginPath();
    this.context.moveTo(left + 32 + offset, 32);
    this.context.lineTo(left + 32 + offset, 32 + 32);
    this.context.moveTo(left + 32 + offset + 16, 32);
    this.context.lineTo(left + 32 + offset + 16, 32 + 32);
    this.context.stroke();

    this.context.restore();
};
