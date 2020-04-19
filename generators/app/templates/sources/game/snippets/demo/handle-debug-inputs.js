export default function (input) {

    if (input.type === 'KEYBOARD'
    && input.action === 'KEY_SPACE'
    && input.state === 'DOWN') {

        if (this.playing === false) {

            console.log('debugging :', 'play game', '(' + this.loop.framerate + 'fps @' + this.loop.speed + 'x)');

            this.play();
        }

        else if (this.playing === true) {

            console.log('debugging :', 'pause game', '(' + this.loop.framerate + 'fps @' + this.loop.speed + 'x)');

            this.pause();
        }
    }

    else if (input.type === 'KEYBOARD'
    && input.action === 'KEY_ENTER'
    && input.state === 'DOWN') {

        console.log('debugging :', 'tick game', '(' + (Math.round(this.delta * 100) / 100) + 'ms @' + this.loop.speed + 'x)');

        this.tick();
    }

    else if (input.type === 'MOUSE'
    && input.action === 'MOVE') {

        this.$.debugging.x = input.x;
        this.$.debugging.y = input.y;
    }
};
