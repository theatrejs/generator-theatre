import {character} from 'entities/demo/character.js';

function start() {

    console.log('lifecycle :', 'start demo scene');

    this.$world.add(character.call(this));
}

export {start};
