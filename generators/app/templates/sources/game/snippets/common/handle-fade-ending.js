export default function (entity, extra) {

    console.log('debugging :', 'component', '\'' + 'fade' + '\'', '(ending)');
    console.log(extra);
    console.log('debugging :', 'entity', '\'' + entity.name + '\'');
    console.log(entity);

    this.snippets.common['remove-fade'](entity);
};
