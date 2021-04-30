export default function (entity, collision) {

    console.log('debugging :', 'component', '\'' + 'hitbox');
    console.log(collision);
    console.log('debugging :', 'entity', '\'' + entity.name + '\'');
    console.log(entity);

    const velocityComponent = this.snippets.common['get-velocity-anyway'](entity);

    if (collision.from.left === true) {

        velocityComponent.right = Math.max(velocityComponent.right, collision.delta.left);
    }
};
