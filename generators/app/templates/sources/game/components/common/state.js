function State(state, $handling) {

    this.name = 'state';

    this.$handling = $handling;
    this.state = state;
    this.changes = [];
}

export {State};
