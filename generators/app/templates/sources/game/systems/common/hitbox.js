import {collide} from 'modules/collide.js';
import {Rectangle} from 'modules/shape.js';

function hitbox(entities) {

    const resolvers = [];

    Object.entries(entities).forEach(([nameA, entityA]) => {

        const hitboxComponentA = entityA.get('hitbox');
        const memoryComponentA = entityA.get('memory');
        const positionComponentA = entityA.get('position');
        const collideableA = hitboxComponentA.collideable;
        const collideableTypesA = Object.keys(collideableA);

        Object.entries(entities).forEach(([nameB, entityB]) => {

            if (nameA === nameB) {

                return;
            }

            const hitboxComponentB = entityB.get('hitbox');
            const memoryComponentB = entityB.get('memory');
            const positionComponentB = entityB.get('position');

            if (collideableTypesA.indexOf(hitboxComponentB.type) !== -1) {

                const A = new Rectangle(

                    positionComponentA.x + hitboxComponentA.x,
                    positionComponentA.y + hitboxComponentA.y,
                    hitboxComponentA.width,
                    hitboxComponentA.height
                );

                const B = new Rectangle(

                    positionComponentB.x + hitboxComponentB.x,
                    positionComponentB.y + hitboxComponentB.y,
                    hitboxComponentB.width,
                    hitboxComponentB.height
                );

                if (collide(A, B) === true) {

                    const {scope, name} = collideableA[hitboxComponentB.type];

                    resolvers.push(this.snippets[scope][name].bind(this, entityA));
                }
            }
        });
    });

    resolvers.forEach((resolver) => {

        resolver();
    });
}

export {hitbox};
