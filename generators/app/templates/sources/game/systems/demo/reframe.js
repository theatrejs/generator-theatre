function reframe(entity) {

    entity.get('image').frame = entity.get('animation').current;
}

export {reframe};
