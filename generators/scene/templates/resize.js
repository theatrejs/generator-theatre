function resize() {

    console.log('resize <%= title %> scene');

    this.$camera.size.height = this.size.height;
    this.$camera.size.width = this.size.width;

    this.$zones.default.x = this.size.width / 2;
    this.$zones.default.y = this.size.height / 2;
    // this.$zones.default.z = 0;
    // this.$zones.default.scale = 1;
}

export {resize};
