function commands(entities) {

    Object.entries(entities).forEach(([name, entity]) => {

        const {commands} = entity.get('commands');

        commands.forEach((command) => {

            switch (command) {

                case 'MOVE_TOP':

                    entity.get('position').y -= 16;
                break;

                case 'MOVE_RIGHT':

                    entity.get('position').x += 16;
                break;

                case 'MOVE_BOTTOM':

                    entity.get('position').y += 16;
                break;

                case 'MOVE_LEFT':

                    entity.get('position').x -= 16;
                break;
            }
        });

        entity.remove('commands');
    });
}

export {commands};
