import {character} from 'entities/demo/character.js';

function start() {

    console.log('start demo scene');

    this.$world.add(character.call(this));
}

export {start};
