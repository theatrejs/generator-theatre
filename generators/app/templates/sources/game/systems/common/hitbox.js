import {collide} from 'modules/collide.js';
import {Rectangle} from 'modules/shape.js';

function hitbox(entities) {

    const resolvers = [];

    Object.entries(entities).forEach(([nameA, entityA]) => {

        const hitboxComponentA = entityA.get('hitbox');
        const positionComponentA = entityA.get('position');

        const collideableA = hitboxComponentA.collideable;
        const collideableTypesA = Object.keys(collideableA);

        Object.entries(entities).forEach(([nameB, entityB]) => {

            if (nameA === nameB) {

                return;
            }

            const hitboxComponentB = entityB.get('hitbox');
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

                    const penetration = {

                        'top': (A.y > B.y && A.y < B.y + B.height) ? B.height - (A.y - B.y) : 0,
                        'right': (A.x + A.width > B.x && A.x + A.width < B.x + B.width) ? A.x + A.width - B.x : 0,
                        'bottom': (A.y + A.height > B.y && A.y + A.height < B.y + B.height) ? A.y + A.height - B.y : 0,
                        'left': (A.x > B.x && A.x < B.x + B.width) ? B.width - (A.x - B.x) : 0
                    };

                    const previousPositionComponentA = entityA.get('previous').position;
                    const previousPositionComponentB = entityB.get('previous').position;

                    const previousHitboxComponentA = entityA.get('previous').hitbox;
                    const previousHitboxComponentB = entityB.get('previous').hitbox;

                    const previousA = new Rectangle(

                        previousPositionComponentA.x + previousHitboxComponentA.x,
                        previousPositionComponentA.y + previousHitboxComponentA.y,
                        previousHitboxComponentA.width,
                        previousHitboxComponentA.height
                    );

                    const previousB = new Rectangle(

                        previousPositionComponentB.x + previousHitboxComponentB.x,
                        previousPositionComponentB.y + previousHitboxComponentB.y,
                        previousHitboxComponentB.width,
                        previousHitboxComponentB.height
                    );

                    const previousOverlapX = !(previousA.x + previousA.width - 1 < previousB.x || previousA.x > previousB.x + previousB.width - 1);
                    const previousOverlapY = !(previousA.y + previousA.height - 1 < previousB.y || previousA.y > previousB.y + previousB.height - 1);

                    let top = previousOverlapX === true && previousOverlapY === false && previousA.y > A.y;
                    let right = previousOverlapY === true && previousOverlapX === false && previousA.x < A.x;
                    let bottom = previousOverlapX === true && previousOverlapY === false && previousA.y < A.y;
                    let left = previousOverlapY === true && previousOverlapX === false && previousA.x > A.x;

                    if (previousOverlapX === false
                    && previousOverlapY === false) {

                        if (penetration.top > 0 && (penetration.top <= penetration.right || penetration.top <= penetration.left)) {

                            top = true;
                        }

                        else if (penetration.right > 0 && (penetration.right <= penetration.top || penetration.right <= penetration.bottom)) {

                            right = true;
                        }

                        else if (penetration.bottom > 0 && (penetration.bottom <= penetration.right || penetration.bottom <= penetration.left)) {

                            bottom = true;
                        }

                        else if (penetration.left > 0 && (penetration.left <= penetration.bottom || penetration.left <= penetration.top)) {

                            left = true;
                        }
                    }

                    const direction = {

                        'top': top,
                        'right': right,
                        'bottom': bottom,
                        'left': left
                    };

                    const collision = {

                        'delta': penetration,
                        'from': direction
                    };

                    const {scope, name} = collideableA[hitboxComponentB.type];

                    resolvers.push(this.snippets[scope][name].bind(this, entityA, collision));
                }
            }
        });
    });

    resolvers.forEach((resolver) => {

        resolver();
    });
}

export {hitbox};
