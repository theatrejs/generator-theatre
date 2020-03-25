function destroy() {

    console.log('destroy <%= title %> scene');
    console.log('-------');

    delete this.$camera;
    delete this.$world;
    delete this.$zones;
}

export {destroy};
