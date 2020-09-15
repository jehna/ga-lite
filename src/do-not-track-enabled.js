export default function doNotTrackEnabled() {
  if (typeof navigator === 'undefined' || typeof window === 'undefined') {
    return false
  }

  const dntNumber = parseInt(
    navigator.msDoNotTrack || // Internet Explorer 9 and 10 vendor prefix
    window.doNotTrack || // IE 11 uses window.doNotTrack
      navigator.doNotTrack, // W3C
    10
  )

  return dntNumber === 1
}
