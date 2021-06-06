import * as Ease from 'modules/ease.js';

function fade(entities) {

    Object.entries(entities).forEach(([name, entity]) => {

        const fadeComponent = entity.get('fade');
        const opacityComponent = this.snippets.common['get-opacity-anyway'](entity);

        if (typeof fadeComponent.fade === 'undefined') {

            fadeComponent.fade = fadeComponent.opacity - opacityComponent.opacity;
        }

        if (typeof fadeComponent.faded === 'undefined') {

            fadeComponent.faded = 0;
        }

        const $easing = fadeComponent.$easing;
        const easing = (fadeComponent.$easing !== false ? this.snippets[$easing.scope][$easing.name]() : Ease.linear(1));

        const remaining = fadeComponent.duration - fadeComponent.elapsed;
        const delta = this.delta > remaining ? remaining : this.delta;

        const progress = (fadeComponent.elapsed + delta) / fadeComponent.duration;
        const faded = fadeComponent.fade * easing(progress);

        opacityComponent.opacity += faded - fadeComponent.faded;

        if (opacityComponent.opacity < 0) {

            opacityComponent.opacity = 0;
        }

        fadeComponent.faded = faded;

        fadeComponent.elapsed += delta;

        if (fadeComponent.elapsed >= fadeComponent.duration) {

            if (typeof fadeComponent.$ending === 'object'
            && fadeComponent.$ending !== null) {

                const $ending = fadeComponent.$ending;
                const ending = this.snippets[$ending.scope][$ending.name];

                entity.remove('fade');

                ending(entity, this.delta - delta);
            }

            else {

                entity.remove('fade');
            }
        }
    });
}

export {fade};
