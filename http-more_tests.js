if (Meteor.isServer) {
  var test, expect, do_test = function (url, extraOptions, code, match) {
    HTTP.get(
      url,
      extraOptions,
      expect(function(error, result) {
        if (error)
          test.fail(error);
        else {
          test.equal(result.statusCode, code);
          if (match)
            test.matches(result.content, match);
        }
      }));
  };

  // Extra options are passed to Mikeal's request module.
  // This is only implemented on the server.
  testAsyncMulti("http-more - prevent UNABLE_TO_VERIFY_LEAF_SIGNATURE error", [
    function businessinsurance(testActual, expectActual) {
      test = testActual, expect = expectActual;  // boilerplate so we don't have to rewrite do_test every time
      // no special options required
      do_test('https://meteor.com', {}, 200, /<title>.*Meteor/);
      // we need to pass {rejectUnauthorized: false}
      do_test('https://www.businessinsurance.com/section/rss?feed=NEWS', {rejectUnauthorized: false}, 200, /<title>Business\s+Insurance\s+-\s+Web\s+News/);
    }
  ]);

  testAsyncMulti("http-more - NYTimes requires cookie jar", [
    function nytimes(testActual, expectActual) {
      test = testActual, expect = expectActual;  // boilerplate so we don't have to rewrite do_test every time
      // we need to pass {jar: true} - see https://groups.google.com/forum/#!topic/meteor-core/HdJK0n-09DA
      do_test('http://rss.nytimes.com/c/34625/f/640316/s/395c8915/sc/1/l/0L0Snytimes0N0C20A140C0A40C150Cbusiness0C20Eexecutives0Eare0Eout0Eat0Egm0Eafter0Erecall0Bhtml0Dpartner0Frss0Gemc0Frss/story01.htm',
        {jar: true}, 200, /<title>.*Executives/i
      );
    }
  ]);

}
