<img src="https://travis-ci.org/jehna/ga-lite.svg?branch=master" alt="Build status">

# ga-lite
> Small, cacheable subset of Google Analytics JS client

This project is a non-official client for [Google Analytics API][ga-api].

## Install to your project

You can install ga-lite to your project by adding the following code to the ended
of your HTML `<body>`:

```html
<script src="https://cdn.jsdelivr.net/ga-lite/latest/ga-lite.min.js" async></script>
<script>
var galite = galite || {};
galite.UA = 'UA-XXXXXX'; // Insert your tracking code here
</script>
```

This includes the most recent version of ga-lite to your site and initializes
the script with your own UA code.

## Developing

Install the project by running:
```shell
npm install
```

### Building

This plugin requires Grunt Command-line interface ```grunt-cli```

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out
the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains
how to install and use Grunt plugins. Once you're familiar with that process,
you may compile this project with this command:

```shell
grunt
```

Once the compilation has ended, Grunt has compiled the assets from `/src` folder
to `/dest` folder.

## Features

At this point the plugin sends the GA `pageview` event to the Google Analytics
server on page unload.

## Configuration

#### UA
Type: `String`  
Required: `true`

The UA code from your [Google Analytics admin panel][ua-code-howto].

Example:
```javascript
var galite = galite || {};
galite.UA = 'UA-123456';
```

#### anonymizeIp
Type: `Boolean`  
Default: `false`

Sets the [aip flag][aip-flag] that advices GA to
[anonymize the IP address][anonymize-ip-address].

Example:
```javascript
var galite = galite || {};
galite.UA = 'UA-XXXXXX'; // Insert your tracking code here
galite.anonymizeIp = true;
```

### Known bugs

Since the beacon is sent on unload, this will most certainly mess up your GA's
page timing (avg. time on site etc).

Also this library does not (yet) track page load times or support sending custom
events.

## Contributing

As stated above, the library is still quite barebone. If you'd like to request a
feature, please [open an issue][issues].

If you'd like to contribute, please fork the repository and use a feature branch.
Pull requests are warmly welcome.

Note: Do not add the `dist/` folder files to your pull request, as the master
branch should have the most up-to-date version's build files included. The
new versions will be automatically fetched by `jsdelivr` to the CDN.

### Motivation

This project was born, because it is currently impossible to use Google Analytics'
official JS library to track your site if you want to achieve 100/100 in Google
PageSpeed Insights.

This happens, because Google Analytics' official JS library is has a cache header
of the length of 2 hours. As PageSpeed Insights forces longer cache times, a
custom GA library is practically the only way to achieve 100/100 points.

This project also makes it possible to:
* Your site to load faster (as this is smaller lib than the official)
* Be sure your site won't serve any code you can't check yourself

You can read more from the [blog post][blog-post] that's written about the
library.

## Licensing

The code in this project is licensed under MIT license.

[ga-api]:https://developers.google.com/analytics/devguides/collection/protocol/v1/reference
[issues]:https://github.com/jehna/ga-lite/issues
[blog-post]:http://thejunkland.com/blog/fixing-last-point-on-google-pagespeed-insights.html
[aip-flag]:https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#aip
[anonymize-ip-address]:https://support.google.com/analytics/answer/2763052
[ua-code-howto]:https://support.google.com/analytics/answer/1032385
