import {images} from 'systems/common/images.js';

function render() {

    // console.log('lifecycle :', 'render demo scene');

    this.context.fillStyle = '#cbdbfc';
    this.context.fillRect(0, 0, this.size.width, this.size.height);

    this.$world.system('images', ['camera', 'images', 'origin', 'position'], images);

    this.$camera.render();
}

export {render};
