function start() {

    console.log('lifecycle :', 'start demo scene');

    this.$.world.initialize([

        ...this.pools.demo.start()
    ]);

    this.$.camera.look(

        () => 0,
        () => 0
    );

    this.$.interface.look(

        () => 0,
        () => 0
    );
}

export {start};
