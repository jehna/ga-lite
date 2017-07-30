export default function sendTo (url) {
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url)
  } else {
    try {
      const req = new window.XMLHttpRequest()
      req.open('GET', url, false)
      req.send()
    } catch (e) {
      // IE9 throws an error with cross-site XMLHttpRequest so
      // we fall back to simple image request
      var i = new window.Image()
      i.src = url
    }
  }
}
