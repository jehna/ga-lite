import galite from '../../src/ga-lite'
import Tracker, { DEFAULT_TRACKER_NAME } from '../../src/tracker'
import MockStorage from './mock-storage'
import { expect } from 'chai'
import { clearStore, getAllTrackers } from '../../src/tracker-store'
import { assertSentTo } from './utils'

describe('galite', () => {
  beforeEach(() => {
    global.window = { screen: {} }
    global.navigator = {}
    global.document = { location: {} }
  })

  afterEach(() => {
    delete global.window
    delete global.navigator
    delete global.document
    clearStore()
  })

  it('should export a function', () => {
    expect(typeof galite).to.eql('function')
  })

  it(`should throw when there's no command available`, () => {
    expect(() => galite('this command sholud not exist')).to.throw()
  })

  it(`should not throw on "create" command`, () => {
    expect(() => galite('create', 'UA-XXXXXX')).to.not.throw()
  })

  it(`should create a new tracker on "create" command`, () => {
    galite('create', 'UA-XXXXXX')
    expect(getAllTrackers().length).to.eql(1)
  })

  it('should expose the tracker', () => {
    const trackerName = 'myTracker'
    galite('create', 'UA-XXXXXX', 'auto', trackerName)
    const tracker = galite.getByName(trackerName)
    expect(tracker).to.be.instanceof(Tracker)
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
        '&z=' + timestamp,
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
        '&z=' + timestamp,
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
        '&z=' + timestamp,
      done
    )

    galite('send', 'timing', 'category', 'lookup', 123, 'label')
  })

  it('should callback with default tracker when called with function', (done) => {
    galite('create', 'UA-XXXXXX', 'auto')
    const defaultTracker = galite.getByName(DEFAULT_TRACKER_NAME)
    galite(tracker => {
      expect(tracker).to.equal(defaultTracker)
      done()
    })
  })
})
