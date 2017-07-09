function GaLite(ua) {

    this.urlBase = (
        'https://www.google-analytics.com/collect?' +
        'cid=' + (localStorage.uid = localStorage.uid || Math.random() + '.' + Math.random()) +
        '&v=1' +
        '&tid=' + ua +
        '&dl=' + encodeURIComponent(document.location.href) +
        '&ul=en-us' +
        '&de=UTF-8'
    );
    // Check for doNotTrack variable. If it's present, the user has decided to
    // opt-out of the tracking, so we kill this tracking script immediately
    this.doNotTrack = parseInt(
        navigator.msDoNotTrack ||  // Internet Explorer 9 and 10 vendor prefix
        window.doNotTrack ||  // IE 11 uses window.doNotTrack
        navigator.doNotTrack,  // W3C
        10
    );
}


GaLite.prototype.sendTo = function(url) {
    if (navigator.sendBeacon) {
        navigator.sendBeacon(url);
    } else {
        try {
            var req = new XMLHttpRequest();
            req.open('GET', url, false);
            req.send();
        } catch (e) {
            // IE9 throws an error with cross-site XMLHttpRequest so
            // we fall back to simple image request
            var i = new Image();
            i.src = url;
        }
    }
};


GaLite.prototype.getOptionalStr = function(values) {
    var str = '';
    for (var i in values) {
        if (values[i] === undefined) {
            return false;
        }
        str += encodeURIComponent(values[i]);
    }
    return str;
};


GaLite.prototype.fireEvent = function(event, params) {
    self = this;
    if (this.doNotTrack === 1) {
        return;
    }
    var optional = {
        'dt': [document.title],
        'sd': [screen.colorDepth, '-bit'],
        'sr': [screen.availHeight, 'x', screen.availWidth],
        'vp': [innerWidth, 'x', innerHeight],
        'dr': [document.referrer]
    };
    var url = self.urlBase;
    for (var key in optional) {
        var value = key + '=' + self.getOptionalStr(optional[key]);
        if (value) {
            url += '&' + value;
        }
    }
    var paramsStr = '';
    for (var key in params) {
        paramsStr += '&' + key + '=' + encodeURIComponent(params[key]);
    }
    var anonymizeIp = galite.anonymizeIp ? '&aip=1' : '';

    self.sendTo(
        url +
        paramsStr +
        anonymizeIp +
        '&t=' + encodeURIComponent(event) +
        '&z=' + new Date().getTime()
    );
};


GaLite.prototype.addToPageLoad = function() {
    self = this;
    if (self.doNotTrack === 1) {
        return;
    }
    window.addEventListener('load', function() {
        var pageLoadedTimestamp = new Date().getTime();

        // Delay the page load event by 100ms
        setTimeout(
            function()
            {
                self.fireEvent('pageview', null);
            },
            100);

        /**
         * Note:
         * unload event does not fire on:
         * - Android chrome on tab closing
         */
        window.addEventListener(
            'unload',
            function()
            {
                self.fireEvent(
                    'timing',
                    {
                        'utc': 'JS Dependencies',
                        'utv': 'unload',
                        'utt': (new Date().getTime() - pageLoadedTimestamp)
                    }
                )
            }
        );
    });
};