function destroy() {

    console.log('destroy loading scene');
    console.log('-------');

    delete this.state.redirect;
}

export {destroy};
