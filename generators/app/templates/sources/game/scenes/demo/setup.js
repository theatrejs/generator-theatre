function setup() {

    console.log('lifecycle :', 'setup demo scene');

    this.$.controllers = this.snippets.common['setup-inputs']('demo');
    this.$.camera = this.snippets.common['setup-camera']('default', 'contain-framed', 320, 256, 1);
    this.$.interface = this.snippets.common['setup-camera']('interface', 'contain-framed', 320, 256, 1);
    this.$.world = this.snippets.common['setup-world']();
}

export {setup};
