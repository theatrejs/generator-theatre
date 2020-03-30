function preload(context, handler) {

    const promises = [];

    // preloads each asset
    context.keys().map((key) => {

        const [type, scope, name] = key.match(/(?!\.\/|\/)(.+?)(?=(?:\.[a-zA-Z0-9]+$)|\/)/g);

        const asset = {

            'getter': null,
            'name': name,
            'scope': scope,
            'source': null,
            'type': type
        };

        // creates a promise for current asset preloading
        const promise = new Promise(function (resolve, reject) {

            // if current asset is a dataset then preload it
            if (asset.type === 'datasets') {

                context(key).then((source) => {

                    asset.source = source;
                    asset.getter = () => source;

                    resolve(asset);
                });
            }

            // if current asset is an image then preload it
            else if (asset.type === 'images') {

                const image = new Image();

                context(key).then((source) => {

                    image.src = source;

                    // when current image is loaded then resolve current promise
                    image.onload = function () {

                        asset.source = source;
                        asset.getter = () => image;

                        resolve(asset);
                    };
                });

            }

            // if current asset is a sound then preload it
            else if (asset.type === 'sounds') {

                context(key).then((source) => {

                    const sound = new Audio(source);

                    // when current sound is loaded then resolve current promise
                    sound.oncanplaythrough = function () {

                        asset.source = source;
                        asset.getter = () => sound.cloneNode();

                        resolve(asset);
                    };
                });
            }
        });

        promises.push(promise);
    });

    // call user's success handler when all assets are preloaded
    Promise.all(promises).then(handler);
}

// exports current module as a function
export {preload};
