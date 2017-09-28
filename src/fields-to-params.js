export default function fieldsToParams (fieldsObject) {
  return Object.keys(fieldsObject)
    .filter(fieldName => FIELDS_TO_PARAMS_MAP.hasOwnProperty(fieldName))
    .filter(fieldName => fieldsObject[fieldName])
    .reduce((obj, fieldName) => ({
      ...obj,
      [FIELDS_TO_PARAMS_MAP[fieldName]]: fieldsObject[fieldName]
    }), {})
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
