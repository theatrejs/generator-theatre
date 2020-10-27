function velocity(entities) {

    Object.entries(entities).forEach(([name, entity]) => {

        const positionComponent = entity.get('position');
        const velocityComponent = entity.get('velocity');

        positionComponent.x += velocityComponent.right - velocityComponent.left;
        positionComponent.y += velocityComponent.bottom - velocityComponent.top;

        velocityComponent.top = 0;
        velocityComponent.right = 0;
        velocityComponent.bottom = 0;
        velocityComponent.left = 0;
    });
}

export {velocity};
