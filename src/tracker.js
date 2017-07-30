import sendTo from './send-to'
import getUserId from './get-user-id'
import buildEventUrl from './build-event-url'

export const DEFAULT_TRACKER_NAME = 't0'

export default class Tracker {
  constructor (trackingId) {
    this.trackingId = trackingId
    this.userId = getUserId()
    this._sendTo = sendTo
    this._getTime = getTime
  }

  send (hitType, fieldsObject) {
    const url = buildEventUrl(hitType, this.userId, this.trackingId, this._getTime())
    this._sendTo(url, fieldsObject)
  }
}

function getTime () {
  return new Date().getTime()
}
