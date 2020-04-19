function start() {

    console.log('lifecycle :', 'start demo scene');

    this.$.debugging = {};

    this.$.world.initialize([

        this.entities.demo.character(),
        this.entities.demo.controls()
    ]);
}

export {start};
