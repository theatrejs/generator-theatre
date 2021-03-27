function pause(entities) {

    if (this.playing === false) {

        const camera = this.$.camera;

        this.context.save();

        const left = 4;
        const width = 8;
        const offset = width / 2;

        this.context.lineWidth = width;

        this.context.fillStyle = 'black';

        const alpha = this.context.globalAlpha;

        this.context.globalAlpha = 0.8;

        this.context.fillRect(camera.screen.x() + 32 - 16, camera.screen.y() + 32 - 16, 32 + 2 * 16, 32 + 2 * 16);

        this.context.globalAlpha = alpha;

        this.context.strokeStyle = 'white';

        this.context.beginPath();
        this.context.moveTo(camera.screen.x() + left + 32 + offset, camera.screen.y() + 32);
        this.context.lineTo(camera.screen.x() + left + 32 + offset, camera.screen.y() + 32 + 32);
        this.context.moveTo(camera.screen.x() + left + 32 + offset + 16, camera.screen.y() + 32);
        this.context.lineTo(camera.screen.x() + left + 32 + offset + 16, camera.screen.y() + 32 + 32);
        this.context.stroke();

        this.context.restore();
    }
}

export {pause};
