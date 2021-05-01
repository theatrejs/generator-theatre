function before() {

    // console.log('lifecycle :', 'before demo scene');

    this.$.controllers.inputs.forEach((input) => {

        this.events.push('INPUT_' + input.action + '_' + input.state);
    });
}

export {before};
