export default function getOptionalStr (key, values = []) {
  if (!key || values.indexOf(undefined) > -1) return ''

  return '&' + key + '=' + values.map(encodeURIComponent).join('')
};
