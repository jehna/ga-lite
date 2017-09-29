import sendTo from '../../src/send-to'
import { expect } from 'chai'

describe('sendTo', () => {
  beforeEach(() => {
    global.navigator = {
      sendBeacon: () => {}
    }
    global.window = {
      XMLHttpRequest: function () {
        this.open = () => {}
        this.send = () => {}
      },
      Image: function () {}
    }
  })

  afterEach(() => {
    delete global.navigator
    delete global.window
  })

  it('should try to call navigator.sendBeacon first', (done) => {
    const expected = 'http://google.com/'
    global.navigator = {
      sendBeacon: url => {
        expect(url).to.eql(expected)
        done()
        return true
      }
    }
    sendTo(expected)
  })

  it('should fallback using XMLHttpRequest', done => {
    const expected = 'http://google.com/'
    delete global.navigator

    global.window.XMLHttpRequest = function () {
      this.didOpen = false
      this.open = function (method, url, sync) {
        expect(sync).to.eql(false)
        expect(url).to.eql(expected)
        expect(method).to.eql('GET')
        this.didOpen = true
      }
      this.send = function () {
        expect(this.didOpen).to.eql(true)
        done()
      }
    }

    sendTo(expected)
  })

  it('should fallback to Image if XMLHttpRequest throws an error', () => {
    const expected = 'http://google.com/'
    delete global.navigator
    let setSrc = null

    global.window.XMLHttpRequest = function () {
      throw new Error('IE9 throws error')
    }
    global.window.Image = () => ({
      set src (url) {
        setSrc = url
      },
      get src () {
        return setSrc
      }
    })

    sendTo(expected)
    expect(setSrc).to.eql(expected)
  })

  it('should fallback to use XMLHttpRequest if sendBeacon returns false', (done) => {
    const expected = 'http://google.com/'

    global.navigator = {
      sendBeacon: () => false
    }
    global.window.XMLHttpRequest = function () {
      this.didOpen = false
      this.open = function (method, url, sync) {
        expect(sync).to.eql(false)
        expect(url).to.eql(expected)
        expect(method).to.eql('GET')
        this.didOpen = true
      }
      this.send = function () {
        expect(this.didOpen).to.eql(true)
        done()
      }
    }

    sendTo(expected)
  })
})
