import {Controllers} from 'modules/controllers.js';

export default function (scope) {

    const inputs = [

        ...this.assets.datasets.debug['inputs'](),
        ...this.assets.datasets[scope]['inputs']()
    ];

    return new Controllers(this.element, inputs);
};
