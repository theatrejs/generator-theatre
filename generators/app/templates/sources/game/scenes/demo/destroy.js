function destroy() {

    console.log('destroy demo scene');
    console.log('-------');

    delete this.$camera;
    delete this.$origins;
    delete this.$world;
}

export {destroy};
