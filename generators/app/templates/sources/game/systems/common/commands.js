function commands(entities) {

    Object.entries(entities).forEach(([name, entity]) => {

        const commands = entity.get('commands');

        commands.forEach(({$command, parameters}) => {

            const command = this.snippets[$command.scope][$command.name];

            command(entity, ...parameters);
        });

        entity.remove('commands');
    });
}

export {commands};
