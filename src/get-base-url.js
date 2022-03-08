import getOptionalUrlParam from './get-optional-url-param'

export default function getBaseUrl(trackingId, userId) {
  return (
    'https://www.google-analytics.com/collect' +
    '?v=1' +
    '&de=UTF-8' +
    getOptionalUrlParam('ul', [navigator.language.toLowerCase()]) +
    getOptionalUrlParam('dl', [document.location.href]) +
    getOptionalUrlParam('dt', [document.title]) +
    getOptionalUrlParam('sd', [window.screen.colorDepth, '-bit']) +
    getOptionalUrlParam('sr', [
      window.screen.availWidth,
      'x',
      window.screen.availHeight
    ]) +
    getOptionalUrlParam('vp', [window.innerWidth, 'x', window.innerHeight]) +
    getOptionalUrlParam('dr', [document.referrer])
  )
}
