Package.describe({
    name: 'wt:xvideos',
    version: '0.0.1',
    // Brief, one-line summary of the package.
    summary: '',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.1.0.3');
    api.use('wt:x-ray',['server']);
    api.use('wt:uri-js',['server']);
    api.use('wt:node-ffprobe',['server']);
    api.use('underscore',['server']);
    api.use('meteorhacks:async',['server']);
    api.addFiles('xvideos.js', ['server']);
});