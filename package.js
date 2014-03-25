Package.describe({
  summary: "Make HTTP calls to remote servers, passing any extra options to the underlying backend"
});

Package.on_use(function (api) {
  api.use('underscore');
  api.export('HTTP');
  api.add_files('meteor/packages/http/httpcall_common.js', ['client', 'server']);
  api.add_files('meteor/packages/http/httpcall_client.js', 'client');
  api.add_files('meteor/packages/http/httpcall_server.js', 'server');
  api.add_files('meteor/packages/http/deprecated.js', ['client', 'server']);
});

Package.on_test(function (api) {
  api.use('webapp', 'server');
  api.use('underscore');
  api.use('random');
  api.use('jquery', 'client');
  api.use('http-more', ['client', 'server']);
  api.use('test-helpers', ['client', 'server']);

  api.add_files('meteor/packages/http/test_responder.js', 'server');
  api.add_files('meteor/packages/http/httpcall_tests.js', ['client', 'server']);
  api.add_files('meteor/packages/http/test_static.serveme', 'client');
  api.add_files('https_tests.js', 'server');
});