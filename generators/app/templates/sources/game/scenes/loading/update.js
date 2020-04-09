function update() {

    // console.log('lifecycle :', 'update loading scene');

    if (this.preloading === false) {

        this.state.timeout += this.delta.update;

        if (this.state.timeout >= 1000) {

            this.load('demo');
        }
    }
}

export {update};
