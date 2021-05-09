export default function (entity, collision) {

    const velocityComponent = this.snippets.common['get-velocity-anyway'](entity);

    if (collision.from.top === true) {

        velocityComponent.bottom = Math.max(velocityComponent.bottom, collision.delta.top);
    }
};
