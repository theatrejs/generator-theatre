function update() {

    // console.log('update loading scene');

    if (this.preloading === false && this.state.redirect === false) {

        setTimeout(() => {

            this.load('demo');

        }, 1000);

        this.state.redirect = true;
    }
}

export {update};
