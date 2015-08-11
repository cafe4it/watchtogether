Package.describe({
    name: 'wt:videojs',
    version: '0.0.4',
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
    api.addFiles([
        'dist/video.js',
        'dist/video.novtt.js',
        'dist/video-js.css',
        'dist/video-js.min.css',
        'dist/video-js.swf',

        'dist/font/vjs.eot',
        'dist/font/vjs.svg',
        'dist/font/vjs.ttf',
        'dist/font/vjs.woff',

        'dist/lang/ar.js',
        'dist/lang/bg.js',
        'dist/lang/ca.js',
        'dist/lang/cs.js',
        'dist/lang/de.js',
        'dist/lang/es.js',
        'dist/lang/fr.js',
        'dist/lang/hu.js',
        'dist/lang/it.js',
        'dist/lang/ja.js',
        'dist/lang/ko.js',
        'dist/lang/nl.js',
        'dist/lang/pt-BR.js',
        'dist/lang/ru.js',
        'dist/lang/tr.js',
        'dist/lang/uk.js',
        'dist/lang/vi.js',
        'dist/lang/zh-CN.js',
        'dist/lang/zh-TW.js'
    ], 'client');
});