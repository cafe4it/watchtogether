Package.describe({
    name: 'wt:accounts',
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
    api.use('accounts-base',['server']);
    api.use('accounts-password',['server']);
    api.use('alanning:roles',['server']);
    api.use('underscore',['server']);
    api.use('anti:fake',['server']);
    api.use('ostrio:cookies',['server']);

    api.addFiles('accounts.js',['server']);
});

Package.onTest(function (api) {
    api.use('tinytest');
    api.use('wt:accounts');
    api.addFiles('accounts-tests.js');
});
