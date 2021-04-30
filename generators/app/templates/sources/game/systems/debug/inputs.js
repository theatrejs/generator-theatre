function inputs(entities) {

    this.$.controllers.inputs.forEach((input) => {

        if (input.action === 'KEYBOARD_TAB'
        && input.state === 'DOWN') {

            this.$.debugging.active = !this.$.debugging.active;
        }

        if (this.$.debugging.active === true) {

            if (input.action === 'KEYBOARD_SHIFT'
            && input.state === 'DOWN') {

                console.clear();

                this.restart();
            }

            if (input.action === 'KEYBOARD_SPACE'
            && input.state === 'DOWN') {

                if (this.playing === false) {

                    this.play();
                }

                else if (this.playing === true) {

                    this.pause();
                }
            }

            if (input.action === 'KEYBOARD_ENTER'
            && input.state === 'DOWN') {

                if (this.playing === false) {

                    this.tick();
                }
            }

            if (input.action === 'MOUSE_MOVE') {

                this.$.debugging.x = input.x;
                this.$.debugging.y = input.y;
            }

            if (input.action === 'KEYBOARD_CTRL'
            && input.state === 'DOWN') {

                this.$.debugging.optional = !this.$.debugging.optional;
            }

            if (typeof this.$.debugging.entity !== 'undefined') {

                if (input.action === 'KEYBOARD_DELETE'
                && input.state === 'DOWN') {

                    this.$.world.remove(this.$.debugging.entity);
                }

                if (input.action === 'KEYBOARD_O'
                && input.state === 'DOWN') {

                    this.$.debugging.entity.get('position').x = 0;
                    this.$.debugging.entity.get('position').y = 0;
                }

                if (input.action === 'KEYBOARD_P'
                && input.state === 'DOWN') {

                    this.$.debugging.entity.get('position').z += 1;
                }

                if (input.action === 'KEYBOARD_M'
                && input.state === 'DOWN') {

                    this.$.debugging.entity.get('position').z -= 1;
                }

                if (input.action === 'KEYBOARD_ESC'
                && input.state === 'DOWN') {

                    this.$.debugging.drag = false;
                    delete this.$.debugging.entity;
                }
            }
        }
    });
}

export {inputs};
