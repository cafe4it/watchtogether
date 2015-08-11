Package.describe({
    name: 'wt:mediaelementjs',
    version: '2.18.1',
    // Brief, one-line summary of the package.
    summary: 'HTML5 <audio> or <video> player enabling a consistent UI in all browsers.',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.1.0.3');
    api.use('jquery', 'client');

    api.addFiles('lib/background.png', 'client');

    api.addFiles('lib/bigplay.fw.png', 'client');
    api.addFiles('lib/bigplay.png', 'client');
    api.addFiles('lib/bigplay.svg', 'client');

    api.addFiles('lib/controls.fw.png', 'client');
    api.addFiles('lib/controls.png', 'client');
    api.addFiles('lib/controls.svg', 'client');
    api.addFiles('lib/controls-ted.png', 'client');
    api.addFiles('lib/controls-wmp.png', 'client');
    api.addFiles('lib/controls-wmp-bg.png', 'client');

    api.addFiles('lib/flashmediaelement.swf', 'client');
    api.addFiles('lib/flashmediaelement-cdn.swf', 'client');

    api.addFiles('lib/loading.gif', 'client');

    api.addFiles('lib/silverlightmediaelement.xap', 'client');
    api.addFiles('lib/skipback.png', 'client');

    api.addFiles('lib/mediaelement-and-player.js', 'client');
    api.addFiles('lib/mediaelementplayer.css', 'client');
    api.addFiles('lib/mejs-skins.css', 'client');
});