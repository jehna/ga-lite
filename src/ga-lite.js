import doNotTrackEnabled from './do-not-track-enabled'
import galiteCommands from './ga-lite-commands'
import { getTracker } from './tracker-store'
import Tracker, { DEFAULT_TRACKER_NAME } from './tracker'
import getTasksInCommandQueue from './get-tasks-in-command-queue'
import './simple-polyfill-array-from'

export default function galite (command, ...values) {
  // Check for doNotTrack variable. If it's present, the user has decided to
  // opt-out of the tracking, so we kill this tracking script
  if (doNotTrackEnabled()) {
    return
  }

  const [trackerName, trackerCommand] = splitTrackerCommand(command)

  const commandFoundInGlobalCommands = !!galiteCommands[command]
  const commandFoundInTrackerMethods = !!Tracker.prototype[trackerCommand] && trackerCommand !== 'constructor'

  if (commandFoundInGlobalCommands) {
    galiteCommands[command](...values)
  } else if (commandFoundInTrackerMethods) {
    const tracker = getTracker(trackerName)
    tracker[trackerCommand](...values)
  } else if (typeof command === 'function') {
    const tracker = getTracker(trackerName)
    command(tracker)
  } else {
    throw new Error(`Command ${command} is not available in ga-lite`)
  }
}

function splitTrackerCommand (command) {
  if (typeof command === 'string' && command.indexOf('.') > -1) {
    return command.split('.')
  } else {
    return [DEFAULT_TRACKER_NAME, command]
  }
}

Object.keys(galiteCommands).forEach(key => { galite[key] = galiteCommands[key] })

getTasksInCommandQueue().forEach(args => galite(...args))