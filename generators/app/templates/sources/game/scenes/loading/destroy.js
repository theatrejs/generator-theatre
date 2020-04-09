function destroy() {

    console.log('lifecycle :', 'destroy loading scene');
    console.log('---------');

    delete this.state.timeout;
}

export {destroy};
