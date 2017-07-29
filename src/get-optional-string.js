export default function getOptionalStr (values = []) {
  if (values.indexOf(undefined) > -1) return ''

  return values.map(encodeURIComponent).join('')
};
