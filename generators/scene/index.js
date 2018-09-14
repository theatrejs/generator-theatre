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

        this.fs.copyTpl(

            this.templatePath('./**/*'),
            this.destinationRoot(this.answers.title),
            {
                'title': this.answers.title
            }
        );
    }
};
