export default function objectToQueryString (object = {}) {
  return Object.keys(object)
    .map(key =>
      [key, object[key]]
        .map(encodeURIComponent)
        .join('='))
    .join('&')
}
