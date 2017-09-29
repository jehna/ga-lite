import { getTracker } from '../tracker-store'

export default function getByName (name) {
  return getTracker(name)
}
