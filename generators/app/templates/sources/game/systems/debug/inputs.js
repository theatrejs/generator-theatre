function inputs(entities) {

    this.$.controllers.inputs.forEach((input) => {

        if (input.type === 'KEYBOARD'
        && input.action === 'KEY_SHIFT'
        && input.state === 'DOWN') {

            this.restart();
        }

        if (input.type === 'KEYBOARD'
        && input.action === 'KEY_SPACE'
        && input.state === 'DOWN') {

            if (this.playing === false) {

                this.play();
            }

            else if (this.playing === true) {

                this.pause();
            }
        }

        if (input.type === 'KEYBOARD'
        && input.action === 'KEY_ENTER'
        && input.state === 'DOWN') {

            if (this.playing === false) {

                this.tick();
            }
        }

        if (typeof this.$.debugging !== 'undefined') {

            if (input.type === 'MOUSE'
            && input.action === 'MOVE') {

                this.$.debugging.x = input.x;
                this.$.debugging.y = input.y;
            }
        }

        if (typeof this.$.debugging !== 'undefined'
        && typeof this.$.debugging.entity !== 'undefined') {

            if (input.type === 'KEYBOARD'
            && input.action === 'KEY_DELETE'
            && input.state === 'DOWN') {

                this.$.world.remove(this.$.debugging.entity);
            }

            if (input.type === 'KEYBOARD'
            && input.action === 'KEY_P'
            && input.state === 'DOWN') {

                this.$.debugging.entity.get('position').z += 1;
            }

            if (input.type === 'KEYBOARD'
            && input.action === 'KEY_M'
            && input.state === 'DOWN') {

                this.$.debugging.entity.get('position').z -= 1;
            }
        }
    });
}

export {inputs};
