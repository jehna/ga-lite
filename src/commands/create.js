import { addTracker } from '../tracker-store'
import Tracker, { DEFAULT_TRACKER_NAME } from '../tracker'

export default function create(
  trackingId,
  cookieDomain,
  name = DEFAULT_TRACKER_NAME,
  fieldsObject = undefined
) {
  const tracker = new Tracker(trackingId)
  addTracker(name, tracker)
  return tracker
}
