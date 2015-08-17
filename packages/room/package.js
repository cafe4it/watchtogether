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
    api.use('anti:fake',['server']);
    api.use('djedi:sanitize-html',['server']);
    api.use('templating',['client']);
    api.use('tracker',['client']);
    api.use('random',['server','client']);
    api.use('underscore',['server','client']);
    api.use('accounts-base',['server','client']);
    api.use('ostrio:cookies',['server','client']);
    api.use('kadira:flow-router',['server','client']);
    api.use('kadira:blaze-layout',['client']);
    api.use('arillo:flow-router-helpers',['client']);
    api.use('juliancwirko:s-alert',['client']);
    api.use('dburles:collection-helpers',['client','server']);

    api.use('wt:xvideos',['server']);

    api.addFiles('lib/000_routes.js',['server','client']);
    api.addFiles('lib/001_schemas.js',['server','client']);
    api.addFiles('server/000_methods.js',['server']);
    api.addFiles('server/001_security.js',['server']);
    api.addFiles('server/001_publications.js',['server']);
    api.addFiles('client/stylesheets/room.css',['client']);
    api.addFiles('client/views/room_home.html',['client']);
    api.addFiles('client/views/room_home.js',['client']);
    api.addFiles('client/views/room_player.html',['client']);
    api.addFiles('client/views/room_player.js',['client']);
    api.addFiles('client/views/modals/modal_playlist.html',['client']);
    api.addFiles('client/views/modals/modal_playlist.js',['client']);
    api.addFiles('client/views/room_menu.html',['client']);
    api.addFiles('client/views/room_menu.js',['client']);
    api.addFiles('client/views/chatbox.html',['client']);
    api.addFiles('client/views/chatbox.js',['client']);
    api.addFiles('client/views/room_create.html',['client']);
    api.addFiles('client/views/room_create.js',['client']);
});
