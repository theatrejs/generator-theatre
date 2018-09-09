function destroy() {

    console.log('destroy demo scene');

    this.keyboard.destroy();

    delete this.inputs;
    delete this.world;

    delete this.keyboard;
    delete this.systems;

    console.log('-------');
}

export {destroy};
