function start() {

    console.log('lifecycle :', 'start demo scene');

    this.$.debugging = {};

    this.$.world.initialize([

        ...this.pools.demo.start()
    ]);

    this.$.camera.look(

        () => 0,
        () => 0
    );
}

export {start};
