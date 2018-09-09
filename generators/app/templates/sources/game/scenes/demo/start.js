import {Entity, World} from 'modules/world.js';

import {Alphabet} from 'components/demo/alphabet.js';
import {Animation} from 'components/demo/animation.js';
import {Direction} from 'components/demo/direction.js';
import {Framerate} from 'components/demo/framerate.js';
import {Image} from 'components/demo/image.js';
import {Input} from 'components/demo/input.js';
import {Position} from 'components/demo/position.js';
import {Spritesheet} from 'components/demo/spritesheet.js';
import {Text} from 'components/demo/text.js';

function start() {

    console.log('start demo scene');

    this.inputs.length = 0;
    this.world = new World();

    this.world.add(new Entity('hero', [

        new Direction('DOWN'),
        new Image(this.assets.images.demo['wizard'], [32, 32], [3, 2]),
        new Input(['KEY_UP', 'KEY_RIGHT', 'KEY_DOWN', 'KEY_LEFT']),
        new Position(this.size.width / 2 - 16, this.size.height / 2 - 16),
        new Spritesheet(this.assets.datasets.demo['wizard'])
    ]));

    this.world.add(new Entity('framerate', [

        new Position(8, 8),
        new Text('fps:60'),
        new Framerate(),
        new Alphabet(this.assets.images.demo['font'], [16, 32]),
        new Spritesheet(this.assets.datasets.demo['font'])
    ]));
}

export {start};
