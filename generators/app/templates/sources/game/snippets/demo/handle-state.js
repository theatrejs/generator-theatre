export default function (entity, changes) {

    const state = entity.get('state').state;
    const part = entity.get('images')[0];

    switch ('' + state.UP + state.RIGHT + state.DOWN + state.LEFT) {

        case '0000':

            part.name = 'idle';
            part.frames = [

                [1, 1, 32, 32],
                [2, 1, 32, 32],
                [3, 1, 32, 32],
                [4, 1, 32, 32],
                [5, 1, 32, 32],
                [6, 1, 32, 32],
                [7, 1, 32, 32],
                [8, 1, 32, 32]
            ];

        break;

        case '1000':

            part.name = 'up';
            part.frames = [

                [1, 2, 32, 32],
                [2, 2, 32, 32],
                [3, 2, 32, 32],
                [4, 2, 32, 32],
                [5, 2, 32, 32],
                [6, 2, 32, 32],
                [7, 2, 32, 32],
                [8, 2, 32, 32]
            ];

        break;

        case '1100':
        case '0100':
        case '0110':

            part.name = 'right';
            part.frames = [

                [1, 3, 32, 32],
                [2, 3, 32, 32],
                [3, 3, 32, 32],
                [4, 3, 32, 32],
                [5, 3, 32, 32],
                [6, 3, 32, 32],
                [7, 3, 32, 32],
                [8, 3, 32, 32]
            ];

        break;

        case '0010':

            part.name = 'down';
            part.frames = [

                [1, 4, 32, 32],
                [2, 4, 32, 32],
                [3, 4, 32, 32],
                [4, 4, 32, 32],
                [5, 4, 32, 32],
                [6, 4, 32, 32],
                [7, 4, 32, 32],
                [8, 4, 32, 32]
            ];

        break;

        case '0011':
        case '0001':
        case '1001':

            part.name = 'left';
            part.frames = [

                [1, 5, 32, 32],
                [2, 5, 32, 32],
                [3, 5, 32, 32],
                [4, 5, 32, 32],
                [5, 5, 32, 32],
                [6, 5, 32, 32],
                [7, 5, 32, 32],
                [8, 5, 32, 32]
            ];

        break;
    }
};
