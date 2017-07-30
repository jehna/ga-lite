import doNotTrackEnabled from './do-not-track-enabled'
import galiteCommands from './ga-lite-commands'
import { getTracker } from './tracker-store'
import Tracker, { DEFAULT_TRACKER_NAME } from './tracker'

export default function galite (command, ...values) {
  // Check for doNotTrack variable. If it's present, the user has decided to
  // opt-out of the tracking, so we kill this tracking script
  if (doNotTrackEnabled()) {
    return
  }

  const commandFoundInGlobalCommands = !!galiteCommands[command]
  const commandFoundInTrackerMethods = !!Tracker.prototype[command] && command !== 'constructor'

  if (commandFoundInGlobalCommands) {
    galiteCommands[command](...values)
  } else if (commandFoundInTrackerMethods) {
    const defaultTracker = getTracker(DEFAULT_TRACKER_NAME)
    defaultTracker[command](...values)
  } else {
    throw new Error(`Command ${command} is not available in ga-lite`)
  }
}

Object.keys(galiteCommands).forEach(key => { galite[key] = galiteCommands[key] });

(function(window, localStorage, navigator, screen, document, encodeURIComponent) {

    window.addEventListener('load', function() {
        var pageLoadedTimestamp = new Date().getTime();

        window.galite = window.galite || {};

        // Delay the page load event by 100ms
        setTimeout(eventBuilder('pageview', null), 100);

        /**
         * Note:
         * unload event does not fire on:
         * - Android chrome on tab closing
         */
        window.addEventListener(
            'unload',
            eventBuilder(
                'timing',
                {
                    'utc': 'JS Dependencies',
                    'utv': 'unload',
                    'utt': (new Date().getTime() - pageLoadedTimestamp)
                }
            )
        );
    });
}) // (window, localStorage, navigator, screen, document, encodeURIComponent);
