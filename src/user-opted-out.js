export default function userOptedOut(trackerName) {
  // https://developers.google.com/analytics/devguides/collection/analyticsjs/user-opt-out#opt-out_of_tracking_for_your_site
  return window[`ga-disable-${trackerName}`] === true
}
