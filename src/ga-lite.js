(function(window, localStorage, Math, navigator, screen, document) {
    window.addEventListener('load', function() {
        var pageLoadedTimestamp = new Date().getTime();
        
        window.galite = window.galite || {};
        var req = new XMLHttpRequest();
        var urlBase = (
            'http://87.100.197.191:9002/collect?' +  //'http://www.google-analytics.com/collect?' +
            'cid=' + (localStorage.uid = localStorage.uid || Math.random() + '.' + Math.random()) +
            '&v=1' +
            '&tid=' + galite.UA +
            '&dl=' + encodeURIComponent(location) +
            '&ul=en-us' +
            '&de=UTF-8' +
            '&dt=' + document.title +
            '&sd=' + screen.colorDepth + '-bit' +
            '&sr=' + screen.availHeight + 'x' + screen.availWidth +
            '&vp=' + innerWidth + 'x' + innerHeight
        );

        var sendTo = function(url) {
            if (navigator.sendBeacon) {
                navigator.sendBeacon(url);
            } else {
                req.open('GET', url, false);
                req.send();
            }
        };

        var eventBuilder = function(event, params) {
            var paramsStr = '';
            for (var key in params) {
                paramsStr = '&' + key + '=' + encodeURIComponent(params[key]);
            }
            return function() {
                sendTo(
                    urlBase +
                    paramsStr +
                    '&t=' + encodeURIComponent(event) +
                    '&z=' + new Date().getTime()
                );
            };
        };
        
        // Deplay the page load event by 100ms
        setTimeout(eventBuilder('pageview'), 100);
        
        /**
         * Note:
         * unload event does not fire on:
         * - Android chrome on tab closing
         */
        window.addEventListener(
            'unload',
            eventBuilder(
                'timing',
                {
                    'utc': 'JS Dependencies',
                    'utv': 'unload',
                    'utt': (new Date().getTime() - pageLoadedTimestamp)
                }
            )
        );
    });
})(window, localStorage, navigator, screen, document, encodeURIComponent);
