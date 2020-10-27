export default function (entity, collision) {

    if (entity.has('forces') === false) {

        entity.add({

            'name': 'forces',
            'parameters': []
        });
    }

    if (entity.has('velocity') === false) {

        entity.add({

            'name': 'velocity',
            'parameters': {

                'top': 0,
                'right': 0,
                'bottom': 0,
                'left': 0
            }
        });
    }

    const forcesComponent = entity.get('forces');
    const velocityComponent = entity.get('velocity');

    let forces = [];

    if (collision.from.top === true) {

        velocityComponent.bottom = Math.max(velocityComponent.bottom, collision.delta.top);

        forces = forcesComponent.filter((force) => {

            return force.y >= 0;
        });
    }

    if (collision.from.right === true) {

        velocityComponent.left = Math.max(velocityComponent.left, collision.delta.right);

        forces = forcesComponent.filter((force) => {

            return force.x <= 0;
        });
    }

    if (collision.from.bottom === true) {

        velocityComponent.top = Math.max(velocityComponent.top, collision.delta.bottom);

        forces = forcesComponent.filter((force) => {

            return force.y <= 0;
        });
    }

    if (collision.from.left === true) {

        velocityComponent.right = Math.max(velocityComponent.right, collision.delta.left);

        forces = forcesComponent.filter((force) => {

            return force.x >= 0;
        });
    }

    entity.add({

        'name': 'forces',
        'parameters': forces
    });
};
