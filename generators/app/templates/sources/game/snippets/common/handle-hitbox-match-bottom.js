export default function (entity, collision) {

    const velocityComponent = this.snippets.common['get-velocity-anyway'](entity);

    if (collision.from.bottom === true) {

        velocityComponent.top = Math.max(velocityComponent.top, collision.delta.bottom);
    }
};
