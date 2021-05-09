export default function (entity, collision) {

    const velocityComponent = this.snippets.common['get-velocity-anyway'](entity);

    if (collision.from.left === true) {

        velocityComponent.right = Math.max(velocityComponent.right, collision.delta.left);
    }
};
