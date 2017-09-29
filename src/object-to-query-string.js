export default function objectToQueryString (object = {}) {
  return Object.keys(object)
    .map(key =>
      [key, object[key]]
        .map(booleansToNumbers)
        .map(encodeURIComponent)
        .join('='))
    .join('&')
}

function booleansToNumbers (value) {
  return typeof value === 'boolean' ? +value : value
}
