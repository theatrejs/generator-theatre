function inputs(entities) {

    this.$.controllers.inputs.forEach((input) => {

        if (input.type === 'KEYBOARD'
        && input.action === 'KEY_TAB'
        && input.state === 'DOWN') {

            this.$.debugging.active = !this.$.debugging.active;
        }

        if (this.$.debugging.active === true) {

            if (input.type === 'KEYBOARD'
            && input.action === 'KEY_SHIFT'
            && input.state === 'DOWN') {

                console.clear();

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

            if (input.type === 'MOUSE'
            && input.action === 'MOVE') {

                this.$.debugging.x = input.x;
                this.$.debugging.y = input.y;
            }

            if (input.type === 'KEYBOARD'
            && input.action === 'KEY_UP'
            && input.state === 'DOWN') {

                const x = this.$.camera.position.x();
                const y = this.$.camera.position.y() - 16;

                this.$.camera.look(

                    () => x,
                    () => y
                );
            }

            if (input.type === 'KEYBOARD'
            && input.action === 'KEY_RIGHT'
            && input.state === 'DOWN') {

                const x = this.$.camera.position.x() + 16;
                const y = this.$.camera.position.y();

                this.$.camera.look(

                    () => x,
                    () => y
                );
            }

            if (input.type === 'KEYBOARD'
            && input.action === 'KEY_DOWN'
            && input.state === 'DOWN') {

                const x = this.$.camera.position.x();
                const y = this.$.camera.position.y() + 16;

                this.$.camera.look(

                    () => x,
                    () => y
                );
            }

            if (input.type === 'KEYBOARD'
            && input.action === 'KEY_LEFT'
            && input.state === 'DOWN') {

                const x = this.$.camera.position.x() - 16;
                const y = this.$.camera.position.y();

                this.$.camera.look(

                    () => x,
                    () => y
                );
            }

            if (input.type === 'KEYBOARD'
            && input.action === 'KEY_CTRL'
            && input.state === 'DOWN') {

                this.$.debugging.optional = !this.$.debugging.optional;
            }

            if (typeof this.$.debugging.entity !== 'undefined') {

                if (input.type === 'KEYBOARD'
                && input.action === 'KEY_DELETE'
                && input.state === 'DOWN') {

                    this.$.world.remove(this.$.debugging.entity);
                }

                if (input.type === 'KEYBOARD'
                && input.action === 'KEY_O'
                && input.state === 'DOWN') {

                    this.$.debugging.entity.get('position').x = 0;
                    this.$.debugging.entity.get('position').y = 0;
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

                if (input.type === 'KEYBOARD'
                && input.action === 'KEY_ESC'
                && input.state === 'DOWN') {

                    this.$.debugging.drag = false;
                    delete this.$.debugging.entity;
                }
            }
        }
    });
}

export {inputs};
