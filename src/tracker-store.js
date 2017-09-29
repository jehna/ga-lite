const store = {}

export function addTracker (trackerName, tracker) {
  store[trackerName] = tracker
}

export function getTracker (trackerName) {
  return store[trackerName]
}

export function removeTracker (trackerName) {
  delete store[trackerName]
}

export function getAllTrackers () {
  return Object.keys(store).map(key => store[key])
}

export function clearStore () {
  return Object.keys(store).forEach(removeTracker)
}
