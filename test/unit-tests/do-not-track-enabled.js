import doNotTrackEnabled from '../../src/do-not-track-enabled'
import { expect } from 'chai'

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
    expect(typeof doNotTrackEnabled).to.eql('function')
  })

  it('should return false if there is no "do not track" variables', () => {
    expect(doNotTrackEnabled()).to.eql(false)
  })

  describe('doNotTrack variable values', () => {
    it('should return false if the "doNotTrack" is set to null', () => {
      global.navigator.doNotTrack = null
      expect(doNotTrackEnabled()).to.eql(false)
    })

    it('should return true if the "doNotTrack" is set', () => {
      global.navigator.doNotTrack = '1'
      expect(doNotTrackEnabled()).to.eql(true)
    })

    it('should handle the IE9 value correctly', () => {
      global.navigator.msDoNotTrack = '1'
      expect(doNotTrackEnabled()).to.eql(true)
    })

    it('should handle the IE11 value correctly', () => {
      global.window.doNotTrack = '1'
      expect(doNotTrackEnabled()).to.eql(true)
    })

    it('should clear the tests every time', () => {
      expect(doNotTrackEnabled()).to.eql(false)
    })
  })
})
