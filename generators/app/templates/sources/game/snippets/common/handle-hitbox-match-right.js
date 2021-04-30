export default function (entity, collision) {

    console.log('debugging :', 'component', '\'' + 'hitbox');
    console.log(collision);
    console.log('debugging :', 'entity', '\'' + entity.name + '\'');
    console.log(entity);

    const velocityComponent = this.snippets.common['get-velocity-anyway'](entity);

    if (collision.from.right === true) {

        velocityComponent.left = Math.max(velocityComponent.left, collision.delta.right);
    }
};
