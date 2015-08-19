Package.describe({
  name: 'wt:node-ffprobe',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'A NodeJS wrapper around ffprobe [v1.2.2]',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/ListenerApproved/node-ffprobe',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Npm.depends({'node-ffprobe' : '1.2.2'});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.addFiles('node-ffprobe.js',['server']);

  api.export('ffProbe',['server']);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('wt:node-ffprobe');
  api.addFiles('node-ffprobe-tests.js');
});
