import {World} from 'modules/world.js';

export default function () {

    return new World(this, () => this.components);
};
