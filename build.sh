git submodule update --init  # this gets the submodule repo at the commit it was when the parent committed
cd meteor
git fetch; git checkout master  # actually update the submodule
cd -
cp meteor/packages/http/{httpcall_server.js,httpcall_tests.js} .
patch httpcall_server.js httpcall_server.patch
patch httpcall_tests.js httpcall_tests.patch
