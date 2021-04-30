export default function (entity, collision) {

    console.log('debugging :', 'component', '\'' + 'hitbox');
    console.log(collision);
    console.log('debugging :', 'entity', '\'' + entity.name + '\'');
    console.log(entity);

    const velocityComponent = this.snippets.common['get-velocity-anyway'](entity);

    if (collision.from.top === true) {

        velocityComponent.bottom = Math.max(velocityComponent.bottom, collision.delta.top);
    }

    if (collision.from.right === true) {

        velocityComponent.left = Math.max(velocityComponent.left, collision.delta.right);
    }

    if (collision.from.bottom === true) {

        velocityComponent.top = Math.max(velocityComponent.top, collision.delta.bottom);
    }

    if (collision.from.left === true) {

        velocityComponent.right = Math.max(velocityComponent.right, collision.delta.left);
    }
};
