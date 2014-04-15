git submodule update --init
cp meteor/packages/http/{httpcall_server.js,httpcall_tests.js} .
patch httpcall_server.js httpcall_server.patch
patch httpcall_tests.js httpcall_tests.patch
