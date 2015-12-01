var galite = galite || {};
var req = new XMLHttpRequest();
var url = 'http://www.google-analytics.com/collect?' +
          'uid=' + (localStorage.uid = localStorage.uid || Math.random() + '.' + Math.random()) +
          '&v=1' +
          '&tid=' + galite.UA +
          '&t=pageview' +
          '&dl=' + encodeURIComponent(location) +
          '&ul=en-us' +
          '&de=UTF-8' +
          '&dt=' + document.title +
          '&sd=' + screen.colorDepth + '-bit' +
          '&sr=' + screen.availHeight + 'x' + screen.availWidth +
          '&vp=' + innerWidth + 'x' + innerHeight +
          '&z=' + new Date().getTime();

window.addEventListener('unload', function() {
    if (navigator.sendBeacon) {
        navigator.sendBeacon(url);
    } else {
        req.open('GET', url, false);
        req.send();
    }
});
