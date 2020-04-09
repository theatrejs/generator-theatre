function resize() {

    console.log('lifecycle :', 'resize <%= title %> scene');

    this.$camera.size.height = this.size.height;
    this.$camera.size.width = this.size.width;

    this.$origins.default.x = this.size.width / 2;
    this.$origins.default.y = this.size.height / 2;
    // this.$origins.default.z = 0;
    // this.$origins.default.scale = 1;
}

export {resize};
