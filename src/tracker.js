import sendTo from './send-to'
import getUserId from './get-user-id'
import buildEventUrl from './build-event-url'

export const DEFAULT_TRACKER_NAME = 't0'

export default class Tracker {
  constructor (trackingId) {
    this.fields = {
      trackingId
    }
    this.userId = getUserId()
    this._sendTo = sendTo
    this._getTime = getTime
  }

  send (hitType, ...fieldsObject) {
    const params = {
      hitType,
      ...argumentsToFields(hitType, fieldsObject),
      ...this.fields
    }
    const url = buildEventUrl(this.fields.trackingId, this._getTime(), this.userId, params)
    this._sendTo(url)
  }

  get (fieldName) {
    return this.fields[fieldName]
  }

  set (fieldName, fieldValue) {
    // TODO: Check behaviour of examples in https://developers.google.com/analytics/devguides/collection/analyticsjs/tracker-object-reference#set
    this.fields[fieldName] = fieldValue
  }
}

function getTime () {
  return new Date().getTime()
}

function argumentsToFields (hitType, args = []) {
  if (args.length === 1 && args[0].constructor === Object) {
    return args[0]
  } else {
    switch (hitType) {
      case 'pageview':
        const [page] = args
        return { page }
      case 'event':
        const [eventCategory, eventAction, eventLabel, eventValue] = args
        return { eventCategory, eventAction, eventLabel, eventValue }
      case 'social':
        const [socialNetwork, socialAction, socialTarget] = args
        return { socialNetwork, socialAction, socialTarget }
      case 'timing':
        const [timingCategory, timingVar, timingValue, timingLabel] = args
        return { timingCategory, timingVar, timingValue, timingLabel }
      default:
        return {}
    }
  }
}
