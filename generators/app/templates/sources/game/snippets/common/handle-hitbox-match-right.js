export default function (entity, collision) {

    const velocityComponent = this.snippets.common['get-velocity-anyway'](entity);

    if (collision.from.right === true) {

        velocityComponent.left = Math.max(velocityComponent.left, collision.delta.right);
    }
};
