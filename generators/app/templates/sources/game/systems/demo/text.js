function text(entity) {

    const alphabetComponent = entity.get('alphabet');
    const positionComponent = entity.get('position');
    const spritesheetComponent = entity.get('spritesheet');
    const textComponent = entity.get('text');

    textComponent.text.split('').forEach((character, index) => {

        this.context.drawImage(

            alphabetComponent.image,
            spritesheetComponent.spritesheet[character][0] * alphabetComponent.size[0], spritesheetComponent.spritesheet[character][1] * alphabetComponent.size[1], alphabetComponent.size[0], alphabetComponent.size[1],
            positionComponent.x + index * alphabetComponent.size[0], positionComponent.y, alphabetComponent.size[0], alphabetComponent.size[1]
        );
    });
}

export {text};
