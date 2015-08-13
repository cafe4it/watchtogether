Package.describe({
    name: 'wt:room',
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
    api.use('templating',['client']);
    api.use('random',['server','client']);
    api.use('underscore',['server','client']);
    api.use('ostrio:cookies',['server','client']);
    api.use('kadira:flow-router',['server','client']);
    api.use('kadira:blaze-layout',['client']);
    api.use('arillo:flow-router-helpers',['client']);

    api.addFiles('lib/000_routes.js',['server','client']);
    api.addFiles('lib/001_schemas.js',['server','client']);
    api.addFiles('server/000_methods.js',['server']);
    api.addFiles('server/001_security.js',['server']);
    api.addFiles('server/001_publications.js',['server']);
    api.addFiles('client/stylesheets/room.css',['client']);
    api.addFiles('client/views/room_home.html',['client']);
    api.addFiles('client/views/room_home.js',['client']);
    api.addFiles('client/views/room_create.html',['client']);
    api.addFiles('client/views/room_create.js',['client']);
});

Package.onTest(function (api) {
    api.use('tinytest');
    api.use('wt:room');
    api.addFiles('room-tests.js');
});
