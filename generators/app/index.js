const Generator = require('yeoman-generator');

module.exports = class extends Generator {

    async prompting() {

        this.answers = await this.prompt([

            {
                'type' : 'input',
                'name' : 'title',
                'message' : 'title',
                'default' : 'theatre'
            },
            {
                'type' : 'input',
                'name' : 'description',
                'message' : 'description',
                'default' : 'game built with theatre (javascript es6 game framework)'
            },
            {
                'type' : 'input',
                'name' : 'github',
                'message' : 'github url',
                'default' : 'https://github.com/hello/friend'
            },
            {
                'type' : 'input',
                'name' : 'name',
                'message' : 'author name',
                'default' : 'Alexandre Blondeau'
            },
            {
                'type' : 'input',
                'name' : 'username',
                'message' : 'author username',
                'default' : 'deformhead'
            }
        ]);
    }

    writing() {

        this.fs.copyTpl(

            this.templatePath('./**/*'),
            this.destinationRoot(),
            {
                'name': this.answers.name,
                'username': this.answers.username,
                'title': this.answers.title,
                'description': this.answers.description,
                'github': this.answers.github,
                'year': (new Date()).getFullYear()
            },
            undefined,
            {
                'globOptions': {'dot': true}
            }
        );
    }
};
