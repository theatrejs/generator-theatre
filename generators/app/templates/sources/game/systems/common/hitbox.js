import {collide} from 'modules/collide.js';
import {Rectangle} from 'modules/shape.js';

function hitbox(entities) {

    const collisions = {};
    const resolvers = [];

    Object.entries(entities).forEach(([nameA, entityA]) => {

        const hitboxComponentA = entityA.get('hitbox');
        const positionComponentA = entityA.get('position');

        Object.entries(entities).forEach(([nameB, entityB]) => {

            if (nameA === nameB) {

                return;
            }

            const hitboxComponentB = entityB.get('hitbox');
            const positionComponentB = entityB.get('position');

            const A = new Rectangle(

                positionComponentA.x + hitboxComponentA.x - (hitboxComponentA.width / 2),
                positionComponentA.y + hitboxComponentA.y - (hitboxComponentA.height / 2),
                hitboxComponentA.width,
                hitboxComponentA.height
            );

            const B = new Rectangle(

                positionComponentB.x + hitboxComponentB.x - (hitboxComponentB.width / 2),
                positionComponentB.y + hitboxComponentB.y - (hitboxComponentB.height / 2),
                hitboxComponentB.width,
                hitboxComponentB.height
            );

            if (collide(A, B) === true) {

                if (typeof collisions[nameA] === 'undefined') {

                    collisions[nameA] = {};
                }

                if (typeof collisions[nameA][hitboxComponentB.type] === 'undefined') {

                    collisions[nameA][hitboxComponentB.type] = [];
                }

                collisions[nameA][hitboxComponentB.type].push(nameB);
            }
        });
    });

    Object.entries(entities).forEach(([nameA, entityA]) => {

        if (typeof collisions[nameA] === 'undefined') {

            return;
        }

        const triggers = entityA.get('hitbox').triggers;

        if (triggers.length === 0) {

            return;
        }

        triggers.forEach((trigger) => {

            let valid = true;

            if (typeof collisions[nameA] === 'undefined'
            || collisions[nameA].hasOwnProperty(trigger.type) === false) {

                valid = false;
            }

            trigger.conditions.forEach((condition) => {

                const search = condition;
                const type = search.replace('not:', '');
                const exclude = search !== type;

                if (typeof collisions[nameA] === 'undefined'
                || collisions[nameA].hasOwnProperty(type) === exclude) {

                    valid = false;
                }
            });

            if (valid === true) {

                const hitboxComponentA = entityA.get('hitbox');
                const positionComponentA = entityA.get('position');

                const namesB = collisions[nameA][trigger.type];

                namesB.forEach((nameB) => {

                    const entityB = this.$.world.get(nameB);

                    const hitboxComponentB = entityB.get('hitbox');
                    const positionComponentB = entityB.get('position');

                    const A = new Rectangle(

                        positionComponentA.x + hitboxComponentA.x - (hitboxComponentA.width / 2),
                        positionComponentA.y + hitboxComponentA.y - (hitboxComponentA.height / 2),
                        hitboxComponentA.width,
                        hitboxComponentA.height
                    );

                    const B = new Rectangle(

                        positionComponentB.x + hitboxComponentB.x - (hitboxComponentB.width / 2),
                        positionComponentB.y + hitboxComponentB.y - (hitboxComponentB.height / 2),
                        hitboxComponentB.width,
                        hitboxComponentB.height
                    );

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

                        previousPositionComponentA.x + previousHitboxComponentA.x - (previousHitboxComponentA.width / 2),
                        previousPositionComponentA.y + previousHitboxComponentA.y - (previousHitboxComponentA.height / 2),
                        previousHitboxComponentA.width,
                        previousHitboxComponentA.height
                    );

                    const previousB = new Rectangle(

                        previousPositionComponentB.x + previousHitboxComponentB.x - (previousHitboxComponentB.width / 2),
                        previousPositionComponentB.y + previousHitboxComponentB.y - (previousHitboxComponentB.height / 2),
                        previousHitboxComponentB.width,
                        previousHitboxComponentB.height
                    );

                    const previousOverlapX = !(previousA.x + previousA.width < previousB.x || previousA.x > previousB.x + previousB.width);
                    const previousOverlapY = !(previousA.y + previousA.height < previousB.y || previousA.y > previousB.y + previousB.height);

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

                    const {scope, name} = trigger.action;

                    resolvers.push(this.snippets[scope][name].bind(this, entityA, collision, entityB));
                });
            }
        });
    });

    resolvers.forEach((resolver) => {

        resolver();
    });
}

export {hitbox};
