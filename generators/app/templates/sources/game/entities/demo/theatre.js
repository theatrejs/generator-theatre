import {Entity} from 'modules/world.js';

import {Camera} from 'components/common/camera.js';
import {Images} from 'components/common/images.js';
import {Origin} from 'components/common/origin.js';
import {Position} from 'components/common/position.js';

function theatre() {

    const entity = new Entity('theatre', [

        new Camera(this.$camera),
        new Images([

            {
                'source': this.assets.images.common.theatre(),
                'frames': [

                    [0, 0, 32, 32],
                    [1, 0, 32, 32],
                    [2, 0, 32, 32],
                    [3, 0, 32, 32],
                    [4, 0, 32, 32],
                    [5, 0, 32, 32],
                    [6, 0, 32, 32],
                    [7, 0, 32, 32]
                ],
                'frame': 0,
                'destination': [0, 0, 0, 64, 64]
            }
        ]),
        new Origin(this.$origins.default),
        new Position(

            -(64 / 2),
            -(64 / 2),
            0
        )
    ]);

    return entity;
}

export {theatre};
