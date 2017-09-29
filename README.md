![Build status](https://travis-ci.org/jehna/ga-lite.svg?branch=master)
[![JSDelivr](https://data.jsdelivr.com/v1/package/npm/ga-lite/badge)](https://www.jsdelivr.com/package/npm/ga-lite)
[![Coverage Status](https://coveralls.io/repos/github/jehna/ga-lite/badge.svg?branch=coveralls)](https://coveralls.io/github/jehna/ga-lite?branch=coveralls)

# ga-lite
> Smaller, cacheable subset of Google Analytics JS client

This project is a non-official implementation for Google Analytics tracker
script [analytics.js][analytics-js]. It uses the
[official API by Google][ga-api] to send analytics events to Google Analytics.

## Version 2 is out! 🎉

Make sure you check the [migration guide](#migrating-from-v1) if you're
upgrading.

## Install to your project

The easiest way to install ga-lite to your project is to include the following
script to your website:

```html
<script>
(function(e,t,n,i,s,a,c){e[n]=e[n]||function(){(e[n].q=e[n].q||[]).push(arguments)}
;a=t.createElement(i);c=t.getElementsByTagName(i)[0];a.async=true;a.src=s
;c.parentNode.insertBefore(a,c)
})(window,document,"galite","script","https://cdn.jsdelivr.net/npm/ga-lite@2/dist/ga-lite.min.js");

galite('create', 'UA-XXXXXXXX-X', 'auto');
galite('send', 'pageview');
</script>
```

This includes the most recent version of ga-lite to your site from the JSDelivr
CDN, initializes the script with your own UA code and sends the current page's
pageview event.

### Hosting on your own server

If you're hosting the script on your own server, just grab the
`dist/ga-lite.min.js` and upload it to your server. Then change the URL from the
loading script (starting with `https://cdn.jsdelivr.net`) to point to your own
server.

### Install via NPM

If you're using a module bundler like Browserify or Webpack, You can also
install the package straight with npm:

```bash
npm install ga-lite --save-dev
```

After the installation, you can use ga-lite in your code by requiring the
package:

**ES5:**
```js
const galite = require('ga-lite')

galite('create', 'UA-XXXXXXXX-X', 'auto')
galite('send', 'pageview')
```

**ES6:**
```js
import galite from 'ga-lite'

galite('create', 'UA-XXXXXXXX-X', 'auto')
galite('send', 'pageview')
```

This imports the package from your `node_modules/` and bundles it to your app's
bundle file. This way you don't need to use the loader script to load the
tracker from an external file.

### Public API

This project uses same public API as the official `analytics.js` script. You can
refer to the usage from the
[Google's official analytics.js documentation][analytics-js].

Only use the `galite` global function instead of `ga` function.

### Migrating from analytics.js

As ga-lite uses same public API as the official `analytics.js`, the migration
from `analytics.js` is really straightforward:

1. Include the ga-lite script
2. Replace any `ga()` function call with `galite()`

If you find any features that are not implemented yet, please open an issue.

## Developing

Install the project by running:

```shell
npm install
```

This installs the needed dependencies for developing this project.

### Running tests

This project uses Mocha unit tests to cover most of the code in this repository.
Also wdio tests are used to test behaviour in actual browser.

You can run the tests by running:

```shell
npm test
```

This runs both unit tests and browser tests in your local machine.

#### Running unit tests

You can run only unit tests by running:

```shell
npm run test:unit
```

This runs all Mocha tests inside `test/unit-tests/` folder.

#### Running browser tests

You can run all browser tests by running:

```shell
npm run test:browser
```

This runs all the wdio specs from `test/browser-tests/specs/` folder.

### Building

You can compile this project with npm command:

```shell
npm run build
```

Once the compilation has ended, webpack has compiled the assets from `/src`
folder to `/dest` folder.

Do not add the `dest/` folder files manually to your pull request. The deploy is
done automatically.

### Deploying

The deploy is done automatically by Travis. Creating a new release is done with
the following npm command:

```shell
npm run release
```

This command will ask for new version number and it will create the build commit
and tag for you automatically.

You'll need to push the tag and commit to git manually.

## Features

This project was first created to be a simple, cacheable alternative to Google
Analytics to gain Google Page Speed test score of 100/100.

However the project exceeded expectations with popularity, and the version 2.0
is built to support many of the official `analytics.js` script's methods:

- Page Tracking
- Event Tracking
- Social Interactions
- User Timings
- Exception Tracking

How does this script differ from the official `analytics.js` script? Here's a
comparison:

| Feature                                      | ga-lite | analytics.js      |
|----------------------------------------------|---------|-------------------|
| Supported by Google                          | No *    | Yes               |
| Size                                         | ~ 8 kB  | ~ 30 kB           |
| Cacheable as long as you want                | Yes     | No (only 2 hours) |
| Open Source                                  | Yes     | No                |
| Can be hosted on your own server             | Yes     | No                |
| Gets disabled on "Do not track" browser flag | Yes     | No                |
| Number of official features                  | Most    | All               |
| Can be installed from NPM                    | Yes     | No                |
| Can be bundled to your vendor.js bundle      | Yes     | No                |
| Browser support                              | Modern  | [Modern and IE10+][analytics-js-support] |

\*) But uses Google's official, supported API

## Contributing

If you'd like to request a feature, or if you find any official `analytics.js`
pubic feature missing, please [open an issue][issues].

If you'd like to contribute, please fork the repository and use a feature
branch. Pull requests are warmly welcome.

Note: Do not add the `dist/` folder files to your pull request, as the master
branch should have the most up-to-date version's build files included. The
new versions will be automatically fetched by `jsdelivr` to the CDN.

### Motivation

This project was born, because it is currently impossible to use Google
Analytics' official JS library to track your site if you want to achieve 100/100
in Google PageSpeed Insights.

This happens, because Google Analytics' official JS library is has a cache
header of the length of 2 hours. As PageSpeed Insights forces longer cache
times, a custom GA library is practically the only way to achieve 100/100 points.

This project also makes it possible to:
* Your site to load faster (as this is smaller lib than the official)
* Be sure your site won't serve any code you can't check yourself

You can read more from the [blog post][blog-post] that's written about the
library.

## Migrating from v1

Note that version 2 is a complete, not backwards compatible rewrite from the
initial ga-lite library.

You must now use the `galite` function to initialize your tracker and send the
initial pageview. So the following code in v1:

```js
var galite = galite || {};
galite.UA = 'UA-XXXXXX';
```

Will need to be converted to:

```js
galite('create', 'UA-XXXXXXXX-X', 'auto');
galite('send', 'pageview');
```

Notice that ga-lite does not send any events or page views anymore on your
behalf. You must explicitly call `galite('send', 'pageview')` to send the
initial page view event.

### Onunload tracking

The version 1 also automatically sent an event on the page's `unload` event.
This was created, because Google Analytics only shows you "time on page" between
the first and last event that you have sent.

Now normally this is fine, as you expect your user to browser different pages
and spend a lot of time on your website. But when user bounces (visits only a
single page), the time is not tracked realistically.

For example: User comes from Reddit to read your blog post. You only send the
`pageview` event to Google Analytics. User reads the article and leaves the
site. GA then shows the time spent on page as 0, even if the user did read the
whole article and spent time with it.

This can be overcome by sending a beacon on the `unload` event, which v1 did
automatically. To avoid any drop in your site's metrics, please include the
following script to your page (after loading ga-lite):

```html
<script>
window.addEventListener(
  'unload',
  function () { galite('send', 'timing', 'JS Dependencies', 'unload') }
)
</script>
```

## Licensing

The code in this project is licensed under MIT license.

[analytics-js]:https://developers.google.com/analytics/devguides/collection/analyticsjs/
[ga-api]:https://developers.google.com/analytics/devguides/collection/protocol/v1/reference
[issues]:https://github.com/jehna/ga-lite/issues
[blog-post]:http://thejunkland.com/blog/fixing-last-point-on-google-pagespeed-insights.html
[aip-flag]:https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#aip
[anonymize-ip-address]:https://support.google.com/analytics/answer/2763052
[ua-code-howto]:https://support.google.com/analytics/answer/1032385
[analytics-js-support]:https://analytics.googleblog.com/2014/12/keeping-ga-web-experience-modern.html
