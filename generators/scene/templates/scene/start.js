function start() {

    console.log('lifecycle :', 'start <%= title %> scene');

    this.$.world.initialize([

        //
    ]);

    this.$.camera.look(

        this.$.origin.x,
        this.$.origin.y
    );
}

export {start};
