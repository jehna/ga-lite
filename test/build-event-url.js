import buildEventUrl from '../src/build-event-url'
import { expect } from 'chai'

describe('buildEventUrl', () => {
  const baseUrl = 'https://www.google-analytics.com/collect?v=1&ul=en-us&de=UTF-8'
  const timestamp = Date.now()
  const userId = '12345'
  const trackingId = 'UA-XXXXXX'
  const eventName = 'MyEvent'

  beforeEach(() => {
    global.window = { screen: {}, localStorage: { uid: '12345' } }
    global.document = { location: {} }
  })

  afterEach(() => {
    delete global.window
    delete global.document
  })

  it('should export a function', () => {
    expect(typeof buildEventUrl).to.eql('function')
  })

  it('should build a correct URL with minimal params', () => {
    expect(buildEventUrl(eventName, userId, trackingId, timestamp)).to.eql(
      baseUrl +
      '&cid=' + userId +
      '&tid=' + trackingId +
      '&t=' + eventName +
      '&z=' + timestamp
    )
  })

  it('should build a correct URL including browser statistics', () => {
    const title = 'Title'
    global.document.location.href = 'http://localhost/'
    global.document.title = title
    global.window.screen.colorDepth = 24
    global.window.screen.availHeight = 600
    global.window.screen.availWidth = 800
    global.window.innerWidth = 320
    global.window.innerHeight = 240
    global.document.referrer = 'http://localhost/referrer'

    expect(buildEventUrl(eventName, userId, trackingId, timestamp)).to.eql(
      baseUrl +
      '&dl=http%3A%2F%2Flocalhost%2F' +
      '&dt=' + title +
      '&sd=24-bit' +
      '&sr=600x800' +
      '&vp=320x240' +
      '&dr=http%3A%2F%2Flocalhost%2Freferrer' +
      '&cid=' + userId +
      '&tid=' + trackingId +
      '&t=' + eventName +
      '&z=' + timestamp
    )
  })

  it('should build a correct URL with extra params', () => {
    expect(buildEventUrl(eventName, userId, trackingId, timestamp, { hello: 'world' })).to.eql(
      baseUrl +
      '&hello=world' +
      '&cid=' + userId +
      '&tid=' + trackingId +
      '&t=' + eventName +
      '&z=' + timestamp
    )
  })

  it('should build a correct URL with anonymized ip', () => {
    expect(buildEventUrl(eventName, userId, trackingId, timestamp, {}, true)).to.eql(
      baseUrl +
      '&aip=1' +
      '&cid=' + userId +
      '&tid=' + trackingId +
      '&t=' + eventName +
      '&z=' + timestamp
    )
  })
})
