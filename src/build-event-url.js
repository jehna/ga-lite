import getBaseUrl from './get-base-url'
import objectToQueryString from './object-to-query-string'

export default function buildEventUrl (event, userId, trackingId, timestamp, params = {}, anonymizeIp = false) {
  const paramsQueryString = objectToQueryString(params)
  return getBaseUrl() +
    (paramsQueryString ? '&' + paramsQueryString : '') +
    (anonymizeIp ? '&aip=1' : '') +
    '&cid=' + userId +
    '&tid=' + trackingId +
    '&t=' + encodeURIComponent(event) +
    '&z=' + timestamp
}
