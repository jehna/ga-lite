import galite from '../../src/ga-lite'
import Tracker, { DEFAULT_TRACKER_NAME } from '../../src/tracker'
import MockStorage from '../mock-storage'
import { clearStore, getAllTrackers } from '../../src/tracker-store'
import { assertSentTo } from '../utils'

describe('galite', () => {
  beforeEach(() => {
    global.window = { screen: {} }
    global.navigator = { language: 'en-us' }
    global.document = { location: {} }
  })

  afterEach(() => {
    delete global.window
    delete global.navigator
    delete global.document
    clearStore()
  })

  it('should export a function', () => {
    expect(galite).toBeInstanceOf(Function)
  })

  it("should throw when there's no command available", () => {
    expect(() => galite('this command sholud not exist')).toThrow()
  })

  it('should not throw on "create" command', () => {
    expect(() => galite('create', 'UA-XXXXXX')).not.toThrow()
  })

  it('should create a new tracker on "create" command', () => {
    galite('create', 'UA-XXXXXX')
    expect(getAllTrackers().length).toBe(1)
  })

  it('should expose the tracker', () => {
    const trackerName = 'myTracker'
    galite('create', 'UA-XXXXXX', 'auto', trackerName)
    const tracker = galite.getByName(trackerName)
    expect(tracker).toBeInstanceOf(Tracker)
  })

  it('should call tracker functions', (done) => {
    const timestamp = Date.now()

    const localStorage = new MockStorage()
    localStorage.setItem('uid', '12345')
    global.window.localStorage = localStorage

    galite('create', 'UA-XXXXXX', 'auto')
    const tracker = galite.getByName(DEFAULT_TRACKER_NAME)
    tracker._getTime = () => timestamp

    tracker._sendTo = assertSentTo(
      'https://www.google-analytics.com/collect' +
        '?v=1&ul=en-us&de=UTF-8' +
        '&t=pageview' +
        '&cid=12345' +
        '&tid=UA-XXXXXX' +
        '&z=' +
        timestamp,
      done
    )

    galite('send', 'pageview')
  })

  it('should call named tracker functions', (done) => {
    const timestamp = Date.now()
    const trackerName = 'myTracker'

    const localStorage = new MockStorage()
    localStorage.setItem('uid', '12345')
    global.window.localStorage = localStorage

    galite('create', 'UA-XXXXXX', 'auto', trackerName)
    const tracker = galite.getByName(trackerName)
    tracker._getTime = () => timestamp

    tracker._sendTo = assertSentTo(
      'https://www.google-analytics.com/collect' +
        '?v=1&ul=en-us&de=UTF-8' +
        '&t=pageview' +
        '&cid=12345' +
        '&tid=UA-XXXXXX' +
        '&z=' +
        timestamp,
      done
    )

    galite(`${trackerName}.send`, 'pageview')
  })

  it('should call complex tracker functions', (done) => {
    const timestamp = Date.now()

    const localStorage = new MockStorage()
    localStorage.setItem('uid', '12345')
    global.window.localStorage = localStorage

    galite('create', 'UA-XXXXXX', 'auto')
    const tracker = galite.getByName(DEFAULT_TRACKER_NAME)
    tracker._getTime = () => timestamp

    tracker._sendTo = assertSentTo(
      'https://www.google-analytics.com/collect' +
        '?v=1&ul=en-us&de=UTF-8' +
        '&t=timing' +
        '&cid=12345' +
        '&tid=UA-XXXXXX' +
        '&utc=category' +
        '&utv=lookup' +
        '&utt=123' +
        '&utl=label' +
        '&z=' +
        timestamp,
      done
    )

    galite('send', 'timing', 'category', 'lookup', 123, 'label')
  })

  it('should callback with default tracker when called with function', (done) => {
    galite('create', 'UA-XXXXXX', 'auto')
    const defaultTracker = galite.getByName(DEFAULT_TRACKER_NAME)
    galite((tracker) => {
      expect(tracker).toBe(defaultTracker)
      done()
    })
  })

  it('should send custom metrics as part of the pageview hit', (done) => {
    const timestamp = Date.now()

    const localStorage = new MockStorage()
    localStorage.setItem('uid', '12345')
    global.window.localStorage = localStorage

    galite('create', 'UA-XXXXXX', 'auto')
    const tracker = galite.getByName(DEFAULT_TRACKER_NAME)
    tracker._getTime = () => timestamp

    tracker._sendTo = assertSentTo(
      'https://www.google-analytics.com/collect' +
        '?v=1&ul=en-us&de=UTF-8' +
        '&cd15=My+Custom+Dimension' +
        '&t=pageview' +
        '&cid=12345' +
        '&tid=UA-XXXXXX' +
        '&z=' +
        timestamp,
      done
    )

    galite('send', 'pageview', {
      dimension15: 'My Custom Dimension'
    })
  })

  it('should send custom metrics as part of event', (done) => {
    const timestamp = Date.now()

    const localStorage = new MockStorage()
    localStorage.setItem('uid', '12345')
    global.window.localStorage = localStorage

    galite('create', 'UA-XXXXXX', 'auto')
    const tracker = galite.getByName(DEFAULT_TRACKER_NAME)
    tracker._getTime = () => timestamp

    tracker._sendTo = assertSentTo(
      'https://www.google-analytics.com/collect' +
        '?v=1&ul=en-us&de=UTF-8' +
        '&t=event' +
        '&ea=action' +
        '&ec=category' +
        '&cm18=8000' +
        '&cid=12345' +
        '&tid=UA-XXXXXX' +
        '&z=' +
        timestamp,
      done
    )

    galite('send', 'event', 'category', 'action', {
      metric18: 8000
    })
  })

  it('should send custom metrics as part of event', (done) => {
    const timestamp = Date.now()

    const localStorage = new MockStorage()
    localStorage.setItem('uid', '12345')
    global.window.localStorage = localStorage

    galite('create', 'UA-XXXXXX', 'auto')
    const tracker = galite.getByName(DEFAULT_TRACKER_NAME)
    tracker._getTime = () => timestamp

    tracker._sendTo = assertSentTo(
      'https://www.google-analytics.com/collect' +
        '?v=1&ul=en-us&de=UTF-8' +
        '&t=pageview' +
        '&cm5=5005' +
        '&cid=12345' +
        '&cd5=custom+dimension+data' +
        '&tid=UA-XXXXXX' +
        '&z=' +
        timestamp,
      done
    )

    galite('set', {
      dimension5: 'custom dimension data',
      metric5: 5005
    })

    galite('send', 'pageview')
  })
})
