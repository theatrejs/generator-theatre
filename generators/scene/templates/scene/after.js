function after() {

    // console.log('lifecycle :', 'after <%= title %> scene');

    if (this.debug === true) {

        this.$.world.system('debug-inputs', [], this.systems.debug.inputs);
        this.$.world.system('debug-hitbox', ['cameras', 'hitbox', 'position'], this.systems.debug.hitbox);
        this.$.world.system('debug-camera', [], this.systems.debug.camera);
        this.$.world.system('debug-spritesheet', ['cameras', 'images', 'position'], this.systems.debug.spritesheet);
        this.$.world.system('debug-pause', [], this.systems.debug.pause);
    }

    this.$.controllers.inputs.length = 0;

    this.$.camera.clean();
}

export {after};
