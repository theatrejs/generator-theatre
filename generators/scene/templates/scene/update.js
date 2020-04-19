function update() {

    // console.log('lifecycle :', 'update <%= title %> scene');

    this.$.world.system('timeout', ['timeout'], this.systems.common.timeout);
    this.$.world.system('commands', ['commands'], this.systems.common.commands);
    this.$.world.system('state', ['state'], this.systems.common.state);
    this.$.world.system('forces', ['position', 'forces'], this.systems.common.forces);
    this.$.world.system('fade', ['camera', 'fade'], this.systems.common.fade);
    this.$.world.system('spritesheets', ['images'], this.systems.common.spritesheets);

    this.$.camera.update(this.delta);
}

export {update};
