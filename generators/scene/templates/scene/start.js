function start() {

    console.log('lifecycle :', 'start <%= title %> scene');

    this.$.world.initialize([

        ...this.pools.<%= title %>.start()
    ]);

    this.$.camera.look(

        () => 0,
        () => 0
    );
}

export {start};
