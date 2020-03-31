const Generator = require('yeoman-generator');

module.exports = class extends Generator {

    async prompting() {

        this.answers = await this.prompt([

            {
                'type' : 'input',
                'name' : 'title',
                'message' : 'title',
                'default' : 'theatre'
            }
        ]);
    }

    writing() {

        // generates assets/datasets structure
        this.fs.copyTpl(

            this.templatePath('./datasets/**/*'),
            this.destinationPath('sources/game/assets/datasets/' + this.answers.title),
            {
                'title': this.answers.title
            }
        );

        // generates assets/images structure
        this.fs.copyTpl(

            this.templatePath('./images/**/*'),
            this.destinationPath('sources/game/assets/images/' + this.answers.title),
            {
                'title': this.answers.title
            },
            undefined,
            {
                'globOptions': {'dot': true}
            }
        );

        // generates assets/sounds structure
        this.fs.copyTpl(

            this.templatePath('./sounds/**/*'),
            this.destinationPath('sources/game/assets/sounds/' + this.answers.title),
            {
                'title': this.answers.title
            },
            undefined,
            {
                'globOptions': {'dot': true}
            }
        );

        // generates components structure
        this.fs.copyTpl(

            this.templatePath('./components/**/*'),
            this.destinationPath('sources/game/components/' + this.answers.title),
            {
                'title': this.answers.title
            },
            undefined,
            {
                'globOptions': {'dot': true}
            }
        );

        // generates entities structure
        this.fs.copyTpl(

            this.templatePath('./entities/**/*'),
            this.destinationPath('sources/game/entities/' + this.answers.title),
            {
                'title': this.answers.title
            },
            undefined,
            {
                'globOptions': {'dot': true}
            }
        );

        // generates scene structure
        this.fs.copyTpl(

            this.templatePath('./scene/**/*'),
            this.destinationPath('sources/game/scenes/' + this.answers.title),
            {
                'title': this.answers.title
            }
        );

        // generates systems structure
        this.fs.copyTpl(

            this.templatePath('./systems/**/*'),
            this.destinationPath('sources/game/systems/' + this.answers.title),
            {
                'title': this.answers.title
            }
        );
    }
};
