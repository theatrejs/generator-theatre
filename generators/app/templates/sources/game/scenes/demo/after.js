function after() {

    // console.log('lifecycle :', 'after demo scene');

    this.$.world.system('debug', [], this.systems.demo.debug);

    this.$.controllers.inputs.length = 0;
}

export {after};
