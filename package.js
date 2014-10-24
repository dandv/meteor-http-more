Package.describe({
  name: 'dandv:http-more',
  summary: "Make HTTP calls to remote servers, passing any extra options to the underlying backend",
  version: '1.0.7_1',
  git: 'https://github.com/dandv/meteor-http-more.git'
});

Npm.depends({request: "2.33.0"});

Package.onUse(function (api) {
  api.versionsFrom('0.9.0');
  api.use('underscore');
  api.use('url@1.0.1');
  api.export('HTTP');
  api.addFiles('meteor/packages/http/httpcall_common.js', ['client', 'server']);
  api.addFiles('meteor/packages/http/httpcall_client.js', 'client');
  api.addFiles('httpcall_server.js', 'server');  // patched
  api.addFiles('meteor/packages/http/deprecated.js', ['client', 'server']);
});

Package.on_test(function (api) {
  api.use('webapp', 'server');
  api.use('underscore');
  api.use('random');
  api.use('jquery', 'client');
  api.use('dandv:http-more', ['client', 'server']);
  api.use('test-helpers', ['client', 'server']);

  api.addFiles('meteor/packages/http/test_responder.js', 'server');
  api.addFiles('httpcall_tests.js', ['client', 'server']);  // patched
  api.addFiles('meteor/packages/http/test_static.serveme', 'client');
  api.addFiles('http-more_tests.js', 'server');
});
