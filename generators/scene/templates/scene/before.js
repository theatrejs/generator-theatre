function before() {

    // console.log('lifecycle :', 'before <%= title %> scene');

    this.$.controllers.inputs.forEach((input) => {

        // console.log('debugging :', input);
    });

    this.$.world.system('inputs', ['inputs'], this.systems.common.inputs);
}

export {before};
