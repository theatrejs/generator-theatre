import {theatre} from 'entities/demo/theatre.js';

function start() {

    console.log('start demo scene');

    this.$world.add(theatre.call(this));
}

export {start};
