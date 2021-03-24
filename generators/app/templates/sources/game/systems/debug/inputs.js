function inputs(entities) {

    this.$.controllers.inputs.forEach((input) => {

        if (input.type === 'KEYBOARD'
        && input.action === 'KEY_SHIFT'
        && input.state === 'DOWN') {

            this.restart();
        }

        else if (input.type === 'KEYBOARD'
        && input.action === 'KEY_SPACE'
        && input.state === 'DOWN') {

            if (this.playing === false) {

                this.play();
            }

            else if (this.playing === true) {

                this.pause();
            }
        }

        else if (input.type === 'KEYBOARD'
        && input.action === 'KEY_ENTER'
        && input.state === 'DOWN') {

            if (this.playing === false) {

                this.tick();
            }
        }

        else if (input.type === 'MOUSE'
        && input.action === 'MOVE') {

            this.$.debugging.x = input.x;
            this.$.debugging.y = input.y;
        }
    });
}

export {inputs};
