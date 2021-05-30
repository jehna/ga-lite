import sendTo from '../../src/send-to'

describe('sendTo', () => {
  beforeEach(() => {
    global.navigator = {
      sendBeacon: jest.fn(() => true)
    }
    global.window = {
      XMLHttpRequest: function () {},
      Image: function () {}
    }
    global.window.XMLHttpRequest.prototype = {
      open: jest.fn(),
      send: jest.fn()
    }
  })

  afterEach(() => {
    delete global.navigator
    delete global.window
  })

  it('should try to call navigator.sendBeacon first', () => {
    const expected = 'http://google.com/'
    sendTo(expected)
    expect(navigator.sendBeacon).toBeCalledWith(expected)
    expect(global.window.XMLHttpRequest.prototype.send).not.toBeCalled()
  })

  it('should fallback using XMLHttpRequest', () => {
    const expected = 'http://google.com/'
    delete global.navigator.sendBeacon

    sendTo(expected)

    expect(global.window.XMLHttpRequest.prototype.open).toBeCalledWith(
      'GET',
      expected,
      false
    )
    expect(global.window.XMLHttpRequest.prototype.send).toBeCalled()
  })

  it('should fallback to Image if XMLHttpRequest throws an error', () => {
    const expected = 'http://google.com/'
    delete global.navigator.sendBeacon
    let setSrc = null

    global.window.XMLHttpRequest = function () {
      throw new Error('IE9 throws error')
    }
    global.window.Image = function () {
      return {
        set src(url) {
          setSrc = url
        },
        get src() {
          return setSrc
        }
      }
    }

    sendTo(expected)
    expect(setSrc).toBe(expected)
  })

  it('should fallback to use XMLHttpRequest if sendBeacon returns false', () => {
    const expected = 'http://google.com/'
    global.navigator.sendBeacon = jest.fn(() => false)

    sendTo(expected)

    expect(global.window.XMLHttpRequest.prototype.open).toBeCalledWith(
      'GET',
      expected,
      false
    )
    expect(global.window.XMLHttpRequest.prototype.send).toBeCalled()
  })
})
