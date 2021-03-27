function render() {

    // console.log('lifecycle :', 'render demo scene');

    this.context.fillStyle = '#000000';
    this.context.fillRect(0, 0, this.size.width, this.size.height);

    this.$.world.system('images', ['cameras', 'images', 'position'], this.systems.common.images);

    this.$.camera.render();
}

export {render};
