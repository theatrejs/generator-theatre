function render() {

    // console.log('render demo scene');

    this.context.fillStyle = '#a8c0b0';
    this.context.fillRect(0, 0, this.size.width, this.size.height);

    this.systems.framerate.update.call(this, this.world.entities);
    this.systems.image.update.call(this, this.world.entities);
    this.systems.text.update.call(this, this.world.entities);
}

export {render};
