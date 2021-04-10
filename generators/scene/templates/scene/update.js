function update() {

    // console.log('lifecycle :', 'update <%= title %> scene');

    this.$.world.system('previous', [], this.systems.common.previous);
    this.$.world.system('timeout', ['timeout'], this.systems.common.timeout);
    this.$.world.system('commands', ['commands'], this.systems.common.commands);
    this.$.world.system('state', ['state'], this.systems.common.state);
    this.$.world.system('forces', ['forces'], this.systems.common.forces);
    this.$.world.system('velocity', ['position', 'velocity'], this.systems.common.velocity);
    this.$.world.system('fade', ['fade'], this.systems.common.fade);
    this.$.world.system('hitbox', ['hitbox', 'position', 'previous'], this.systems.common.hitbox);
    this.$.world.system('velocity', ['position', 'velocity'], this.systems.common.velocity);
    this.$.world.system('spritesheets', ['images'], this.systems.common.spritesheets);

    this.$.camera.update(this.delta);
    this.$.interface.update(this.delta);
}

export {update};
