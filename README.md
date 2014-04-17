# Meteor's HTTP package + extra options: proxy, cookies and more

`http-more` is a drop-in replacement for Meteor's [standard HTTP package](http://docs.meteor.com/#http), backward-compatible with it, and enhanced to pass through extra options to the backend ([@mikeal's request](https://github.com/mikeal/request) as of Meteor 0.8.0).
It also passes back from `request` the final URL after following redirects, which will be available in the `href` field of the `result` object.

These modifications are very minimal - just 8 lines of code. Unfortuantely, the Meteor team [refused](https://github.com/meteor/meteor/issues/1703) to accept a pull request for this type of enhancement, hence the need for a separate package.

## Features

All the extra features are available on the server only, because the underlying `xhr` object doesn't have any of the properties below.

* [proxy support](http://stackoverflow.com/a/22069540/1269037)
* [cookies](https://groups.google.com/forum/#!topic/meteor-core/HdJK0n-09DA) to avoid getting stuck in redirect loops
* [get the final URL after redirects](https://groups.google.com/forum/#!topic/meteor-talk/Uu_ouiZB-P8)
* [pass TLS/SSL options](http://stackoverflow.com/q/20681044/1269037)
* customize `maxRedirects`
* ... and all the other [`request` options](https://github.com/mikeal/request#requestoptions-callback)

## Why

Ever got an SSL error when doing an `HTTP.get()` call in Meteor, like [`UNABLE_TO_VERIFY_LEAF_SIGNATURE`](http://stackoverflow.com/questions/20681044/how-can-i-pass-extra-options-to-node-in-meteors-http-call)?
That's because you need to pass [a certain TLS option](http://stackoverflow.com/questions/17200391/nodejs-unable-to-verify-leaf-signature) along with the request. No big deal, right, since Meteor's HTTP package uses [mikeal's request](https://github.com/mikeal/request) Npm module?
Wrong. The problem is you can't just pass extra options to `request`, because [Meteor is opinionated and wants to](https://github.com/meteor/meteor/issues/1703)
> provide a consistent interface between client and server, so adding lots of server-only options doesn't seem look a good idea

...despite the fact that the server and client are essentially different, e.g. the client doesn't support redirects, or can run into CORS restrictions etc. Read more on the debate at [Meteor issue #1703](https://github.com/meteor/meteor/issues/1703).

This is where `http-more` comes in. It lets you pass through to the underlying HTTP backend (or frontend) any options you want.
Currently, the backend is mikeal's `request` module, so you can pass, for example, `{rejectUnauthorized: false}` to avoid that `LEAF_SIGNATURE` error, or {jar: true} to enable a session cookie jar.


## Installation

1. `npm install -g meteorite` (if not already installed)
2. `meteor remove http`
3. `mrt add http-more`


## Contributing and tests

After cloning this repo, run `./build.sh` to check out the latest Meteor and apply the patch. To run the tests, rename the cloned repo directory to `http-more`, and run in it `meteor test-packages .`.

`http-more_tests.js` includes:

* a test against a site that as of March 2014, generates that `UNABLE_TO_VERIFY_LEAF_SIGNATURE` error.
* a test against an NYTimes RSS feed that needs a cookie jar to redirect properly - [`request` issue #865](https://github.com/mikeal/request/issues/865)

More tests, against other `request` options, are very welcome.


## How it works

The repo includes [`meteor/meteor`](https://github.com/meteor/meteor) as a submodule, then patches only 7 lines in `httpcall_server.js`. There's another one-line patch in `httpcall_tests.js` due to repackaging the files. That's it.

Hopefully the Meteor team will fold this patch into the core, even as an undocumented option.


## Author, license and copyright

Author: Dan Dascalescu ([@dandv](http://github.com/dandv))

Copyright (c) 2014 StockBase, LLC.

The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
