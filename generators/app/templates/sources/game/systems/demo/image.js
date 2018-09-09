function image(entity) {

    const imageComponent = entity.get('image');
    const positionComponent = entity.get('position');

    this.context.drawImage(

        imageComponent.image,
        imageComponent.frame[0] * imageComponent.size[0], imageComponent.frame[1] * imageComponent.size[1], imageComponent.size[0], imageComponent.size[1],
        positionComponent.x, positionComponent.y, imageComponent.size[0], imageComponent.size[1]
    );
}

export {image};
