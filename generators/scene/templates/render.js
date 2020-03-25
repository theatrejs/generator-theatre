import {fade} from 'systems/common/fade.js';
import {images} from 'systems/common/images.js';

function render() {

    // console.log('render <%= title %> scene');

    this.context.fillStyle = '#d7dae0';
    this.context.fillRect(0, 0, this.size.width, this.size.height);

    this.$world.system(['camera', 'fade'], fade);
    this.$world.system(['camera', 'images', 'position', 'zone'], images);

    this.$camera.render();
}

export {render};
