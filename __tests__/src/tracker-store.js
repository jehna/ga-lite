import * as trackerStore from '../../src/tracker-store'

describe('trackerStore basic functions', () => {
  afterEach(() => {
    trackerStore.clearStore()
  })

  it('should add trackers', () => {
    trackerStore.addTracker('test', 'tracker')
    expect(trackerStore.getAllTrackers().length).toBe(1)
    trackerStore.addTracker('test2', 'tracker2')
    expect(trackerStore.getAllTrackers().length).toBe(2)
  })

  it('should get the tracker', () => {
    const tracker = Symbol('tracker')
    trackerStore.addTracker('symbolTracker', tracker)
    expect(trackerStore.getAllTrackers().length).toBe(1)
    expect(trackerStore.getTracker('symbolTracker')).toBe(tracker)
  })

  it('should remove trackers', () => {
    const tracker = 'tracker'

    trackerStore.addTracker('myTracker', tracker)
    expect(trackerStore.getAllTrackers().length).toBe(1)
    trackerStore.removeTracker('myTracker')
    expect(trackerStore.getAllTrackers().length).toBe(0)
    expect(trackerStore.getTracker('myTracker')).not.toBe(tracker)
  })
})
