function commands(entities) {

    Object.entries(entities).forEach(([name, entity]) => {

        const {commands} = entity.get('commands');

        commands.forEach(({$command, parameters}) => {

            const $handling = this.snippets[$command.scope][$command.name];

            $handling(entity, ...parameters);
        });

        entity.remove('commands');
    });
}

export {commands};
