const ghpages = require('gh-pages');

const options = {

    'history': false,
    'message': 'add \'gh-pages\' preview'
}

ghpages.publish('dist', options);
