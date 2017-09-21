import getBaseUrl from './get-base-url'
import objectToQueryString from './object-to-query-string'
import fieldsToParams from './fields-to-params'

export default function buildEventUrl (trackingId, timestamp, userId, params = {}, anonymizeIp = false) {
  const paramsQueryString = objectToQueryString(fieldsToParams(params))
  return getBaseUrl() +
    (paramsQueryString ? '&' + paramsQueryString : '') +
    (anonymizeIp ? '&aip=1' : '') +
    '&cid=' + userId +
    '&tid=' + trackingId +
    '&z=' + timestamp
}
