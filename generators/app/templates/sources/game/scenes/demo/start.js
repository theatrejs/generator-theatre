function start() {

    console.log('lifecycle :', 'start demo scene');

    this.$.debugging = {};

    this.$.world.initialize([

        ...this.pools.demo.start()
    ]);

    this.$.camera.look(

        this.$.origin.x,
        this.$.origin.y
    );
}

export {start};
