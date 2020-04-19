function update() {

    // console.log('lifecycle :', 'update loading scene');

    if (this.preloading === false) {

        this.$.timeout += this.delta;

        if (this.$.timeout >= 1000) {

            this.load('demo');
        }
    }
}

export {update};
