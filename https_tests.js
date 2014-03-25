if (Meteor.isServer) {
  // Extra options are passed to Mikeal's request module.
  // This is only implemented on the server.
  testAsyncMulti("https - prevent UNABLE_TO_VERIFY_LEAF_SIGNATURE error", [
    function(test, expect) {
      var do_test = function (url, extraOptions, code, match) {
        HTTP.get(
          url,
          extraOptions,
          expect(function(error, result) {
            test.equal(result.statusCode, code);
            if (match)
              test.matches(result.content, match);
          }));
      };

      // no special options required
      do_test('https://meteor.com', {}, 200, /<title>.*Meteor/);
      // we need to pass {rejectUnauthorized: false}
      do_test('https://www.businessinsurance.com/section/rss?feed=NEWS', {rejectUnauthorized: false}, 200, /<title>Business\s+Insurance\s+-\s+Web\s+News/);

    }
  ]);
}
  