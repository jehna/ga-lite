import doNotTrackEnabled from '../../src/do-not-track-enabled'

describe('doNotTrackEnabled', () => {
  beforeEach(() => {
    global.window = {}
    global.navigator = {}
  })

  afterEach(() => {
    delete global.window
    delete global.navigator
  })

  it('should export a function', () => {
    expect(doNotTrackEnabled).toBeInstanceOf(Function)
  })

  it('should return false if there is no "do not track" variables', () => {
    expect(doNotTrackEnabled()).toBe(false)
  })

  describe('doNotTrack variable values', () => {
    it('should return false if the "doNotTrack" is set to null', () => {
      global.navigator.doNotTrack = null
      expect(doNotTrackEnabled()).toBe(false)
    })

    it('should return true if the "doNotTrack" is set', () => {
      global.navigator.doNotTrack = '1'
      expect(doNotTrackEnabled()).toBe(true)
    })

    it('should handle the IE9 value correctly', () => {
      global.navigator.msDoNotTrack = '1'
      expect(doNotTrackEnabled()).toBe(true)
    })

    it('should handle the IE11 value correctly', () => {
      global.window.doNotTrack = '1'
      expect(doNotTrackEnabled()).toBe(true)
    })

    it('should clear the tests every time', () => {
      expect(doNotTrackEnabled()).toBe(false)
    })
  })
})
