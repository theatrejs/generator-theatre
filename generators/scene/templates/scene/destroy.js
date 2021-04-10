function destroy() {

    console.log('lifecycle :', 'destroy <%= title %> scene');
    console.log('---------');

    this.$.controllers.destroy();

    delete this.$.camera;
    delete this.$.interface;
    delete this.$.controllers;
    delete this.$.debugging;
    delete this.$.world;
}

export {destroy};
