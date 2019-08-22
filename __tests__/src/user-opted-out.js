import userOptedOut from '../../src/user-opted-out'

describe('userOptedOut', () => {
  beforeEach(() => {
    global.window = {}
  })

  afterEach(() => {
    delete global.window
  })

  it('should export a function', () => {
    expect(userOptedOut).toBeInstanceOf(Function)
  })

  it('should return false if the user has not set any opt-out variables', () => {
    expect(userOptedOut('UA-123')).toBe(false)
  })

  it('should return true if user has opted out with a global vairable', () => {
    global.window['ga-disable-UA-123'] = true
    expect(userOptedOut('UA-123')).toBe(true)
  })
})
