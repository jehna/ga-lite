export default function fieldsToParams(fieldsObject) {
  const params = {}
  for (const fieldName of Object.keys(fieldsObject)) {
    const paramValue = fieldsObject[fieldName]
    if (!paramValue) {
      continue
    }

    if (fieldName in FIELDS_TO_PARAMS_MAP) {
      const paramName = FIELDS_TO_PARAMS_MAP[fieldName]
      params[paramName] = paramValue
    }
    // handle dimension1, metric2, etc.
    const matchedCustomValue = CUSTOM_VALUES_RE.exec(fieldName)
    if (matchedCustomValue) {
      const [, type, digits] = matchedCustomValue
      const paramName = CUSTOM_VALUES_TO_PARAMS_MAP[type] + digits
      params[paramName] = paramValue
    }
  }
  return params
}

const FIELDS_TO_PARAMS_MAP = {
  anonymizeIp: 'aip',
  dataSource: 'ds',
  queueTime: 'qt',
  userId: 'uid',
  sessionControl: 'sc',
  referrer: 'dr',
  campaignName: 'cn',
  campaignSource: 'cs',
  campaignMedium: 'cm',
  campaignKeyword: 'ck',
  campaignContent: 'cc',
  campaignId: 'ci',
  screenResolution: 'sr',
  viewportSize: 'vp',
  encoding: 'de',
  screenColors: 'sd',
  language: 'ul',
  javaEnabled: 'je',
  flashVersion: 'fl',
  hitType: 't',
  nonInteraction: 'ni',
  location: 'dl',
  hostname: 'dh',
  page: 'dp',
  title: 'dt',
  screenName: 'cd',
  linkid: 'linkid',
  appName: 'an',
  appId: 'aid',
  appVersion: 'av',
  appInstallerId: 'aiid',
  eventCategory: 'ec',
  eventAction: 'ea',
  eventLabel: 'el',
  eventValue: 'ev',
  currencyCode: 'cu',
  socialNetwork: 'sn',
  socialAction: 'sa',
  socialTarget: 'st',
  timingCategory: 'utc',
  timingVar: 'utv',
  timingValue: 'utt',
  timingLabel: 'utl',
  exDescription: 'exd',
  exFatal: 'exf',
  expId: 'xid',
  expVar: 'xvar'
}

const CUSTOM_VALUES_RE = /(dimension|metric)(\d+)/

const CUSTOM_VALUES_TO_PARAMS_MAP = {
  dimension: 'cd',
  metric: 'cm'
}
