import sendTo from './send-to'
import getUserId from './get-user-id'
import buildEventUrl from './build-event-url'
import userOptedOut from './user-opted-out'

export const DEFAULT_TRACKER_NAME = 't0'

export default class Tracker {
  constructor(trackingId) {
    this.fields = {
      trackingId
    }
    this.userId = getUserId()
    this._sendTo = sendTo
    this._getTime = getTime
  }

  send(hitType, ...fieldsObject) {
    if (userOptedOut(this.fields.trackingId)) {
      return
    }

    const params = {
      hitType,
      ...argumentsToFields(hitType, fieldsObject),
      ...this.fields
    }
    const url = buildEventUrl(
      this.fields.trackingId,
      this._getTime(),
      this.userId,
      params
    )
    this._sendTo(url)
  }

  get(fieldName) {
    return this.fields[fieldName]
  }

  set(fieldNameOrObject, fieldValue) {
    if (fieldNameOrObject.constructor === Object) {
      for (const fieldName in fieldNameOrObject) {
        this.fields[fieldName] = fieldNameOrObject[fieldName]
      }
    } else {
      this.fields[fieldNameOrObject] = fieldValue
    }
  }
}

function getTime() {
  return new Date().getTime()
}

function argumentsToFields(hitType, args = []) {
  const lastArgIsFieldsObject =
    args.length >= 1 && args[args.length - 1].constructor === Object
  const fieldsObject = lastArgIsFieldsObject ? args[args.length - 1] : {}
  args = lastArgIsFieldsObject ? args.slice(0, -1) : args

  switch (hitType) {
    case 'pageview': {
      const [page] = args
      return { page, ...fieldsObject }
    }
    case 'event': {
      const [eventCategory, eventAction, eventLabel, eventValue] = args
      return {
        eventCategory,
        eventAction,
        eventLabel,
        eventValue,
        ...fieldsObject
      }
    }
    case 'social': {
      const [socialNetwork, socialAction, socialTarget] = args
      return { socialNetwork, socialAction, socialTarget, ...fieldsObject }
    }
    case 'timing': {
      const [timingCategory, timingVar, timingValue, timingLabel] = args
      return {
        timingCategory,
        timingVar,
        timingValue,
        timingLabel,
        ...fieldsObject
      }
    }
    default:
      return fieldsObject
  }
}
