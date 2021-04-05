function setup() {

    console.log('lifecycle :', 'setup <%= title %> scene');

    this.$.controllers = this.snippets.common['setup-inputs']('<%= title %>');
    this.$.camera = this.snippets.common['setup-camera']('default', 'contain-framed', 320, 256, 1);
    this.$.world = this.snippets.common['setup-world']();
}

export {setup};
