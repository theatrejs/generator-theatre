function commands(entities) {

    Object.entries(entities).forEach(([name, entity]) => {

        const {commands} = entity.get('commands');

        commands.forEach((command) => {

            switch (command) {

                //
            }
        });

        entity.remove('commands');
    });
}

export {commands};
