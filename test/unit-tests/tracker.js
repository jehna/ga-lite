import Tracker from '../../src/tracker'
import MockStorage from './mock-storage'
import { expect } from 'chai'
import { assertSentTo } from './utils'

describe('Tracker', () => {
  const localStorage = new MockStorage()
  localStorage.setItem('uid', '12345')

  beforeEach(() => {
    global.window = { screen: {}, localStorage }
    global.navigator = {}
    global.document = { location: {} }
  })

  afterEach(() => {
    delete global.window
    delete global.navigator
    delete global.document
  })

  it('should export a class', () => {
    expect(typeof Tracker).to.eql('function')
    expect(() => Tracker()).to.throw(TypeError, `Cannot call a class as a function`)
  })

  it('should send correct URL on "send" method', (done) => {
    const trackingId = 'UA-XXXXXX'
    const tracker = new Tracker(trackingId)
    const timestamp = Date.now()
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
    tracker.send('pageview')
  })

  it('should get fields', () => {
    const trackingId = 'UA-XXXXXX'
    const tracker = new Tracker(trackingId)

    expect(tracker.get('trackingId')).to.eql(trackingId)
  })

  it('should set fields', () => {
    const trackingId = 'UA-XXXXXX'
    const tracker = new Tracker(trackingId)
    const randomValue = Math.random().toFixed(3)

    tracker.set('randomValue', randomValue)
    expect(tracker.get('randomValue')).to.eql(randomValue)
  })

  it('should send correct pageview event with arguments', (done) => {
    const trackingId = 'UA-XXXXXX'
    const tracker = new Tracker(trackingId)
    const timestamp = Date.now()
    tracker._getTime = () => timestamp

    tracker._sendTo = assertSentTo(
      'https://www.google-analytics.com/collect' +
        '?v=1&ul=en-us&de=UTF-8' +
        '&t=pageview' +
        '&cid=12345' +
        '&tid=UA-XXXXXX' +
        '&dp=/hello/world.html' +
        '&z=' + timestamp,
      done
    )
    tracker.send('pageview', '/hello/world.html')
  })

  it('should send correct "event" event with arguments', (done) => {
    const trackingId = 'UA-XXXXXX'
    const tracker = new Tracker(trackingId)
    const timestamp = Date.now()
    tracker._getTime = () => timestamp

    tracker._sendTo = assertSentTo(
      'https://www.google-analytics.com/collect' +
        '?v=1&ul=en-us&de=UTF-8' +
        '&t=event' +
        '&cid=12345' +
        '&tid=UA-XXXXXX' +
        '&ec=link' +
        '&ea=click' +
        '&el=http://example.com' +
        '&ev=55' +
        '&z=' + timestamp,
      done
    )
    tracker.send('event', 'link', 'click', 'http://example.com', 55)
  })

  it('should send correct social event with arguments', (done) => {
    const trackingId = 'UA-XXXXXX'
    const tracker = new Tracker(trackingId)
    const timestamp = Date.now()
    tracker._getTime = () => timestamp

    tracker._sendTo = assertSentTo(
      'https://www.google-analytics.com/collect' +
        '?v=1&ul=en-us&de=UTF-8' +
        '&t=social' +
        '&cid=12345' +
        '&tid=UA-XXXXXX' +
        '&sn=facebook' +
        '&sa=like' +
        '&st=http://foo.com' +
        '&z=' + timestamp,
      done
    )
    tracker.send('social', 'facebook', 'like', 'http://foo.com')
  })

  it('should send correct timing event with arguments', (done) => {
    const trackingId = 'UA-XXXXXX'
    const tracker = new Tracker(trackingId)
    const timestamp = Date.now()
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
    tracker.send('timing', 'category', 'lookup', 123, 'label')
  })

  it('should send correct exception event with arguments', (done) => {
    const trackingId = 'UA-XXXXXX'
    const tracker = new Tracker(trackingId)
    const timestamp = Date.now()
    tracker._getTime = () => timestamp

    tracker._sendTo = assertSentTo(
      'https://www.google-analytics.com/collect' +
        '?v=1&ul=en-us&de=UTF-8' +
        '&t=exception' +
        '&cid=12345' +
        '&tid=UA-XXXXXX' +
        '&exd=DatabaseError' +
        '&exf=1' +
        '&z=' + timestamp,
      done
    )
    tracker.send('exception', {
      exDescription: 'DatabaseError',
      exFatal: true
    })
  })

  it('should set correct timestamp', (done) => {
    const trackingId = 'UA-XXXXXX'
    const tracker = new Tracker(trackingId)
    const start = Date.now()
    tracker._sendTo = url => {
      const trackerTime = parseInt(url.match(/z=(\d+)/)[1])
      const end = Date.now()

      expect(trackerTime).to.be.gte(start)
      expect(trackerTime).to.be.lte(end)
      done()
    }

    tracker.send('pageview', '/hello/world.html')
  })
})
