import { addTracker } from '../tracker-store'
import Tracker from '../tracker'

const DEFAULT_TRACKER_NAME = 't0'

export default function create (trackingId, cookieDomain, name = DEFAULT_TRACKER_NAME, fieldsObject) {
  addTracker(name, new Tracker(trackingId))
}
