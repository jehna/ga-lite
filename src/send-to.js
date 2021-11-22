export default function sendTo(url) {
  if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
    try {
      const didSucceed = navigator.sendBeacon(url)
      if (didSucceed) {
        return
      }
    } catch (e) {
      // ignore
    }
  }

  try {
    const req = new window.XMLHttpRequest()
    req.open('GET', url, false)
    req.send()
  } catch (e) {
    // IE9 throws an error with cross-site XMLHttpRequest so
    // we fall back to simple image request
    const i = new window.Image()
    i.src = url
  }
}
