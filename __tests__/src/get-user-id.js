import getUserId from '../../src/get-user-id'
import MockStorage from '../mock-storage'

describe('getUserId', () => {
  const mockStorage = new MockStorage()

  beforeEach(() => {
    global.window = {}
  })

  afterEach(() => {
    mockStorage.clear()
    delete global.window
  })

  it('should export a function', () => {
    expect(getUserId).toBeInstanceOf(Function)
  })

  it('should generate a random string', () => {
    expect(typeof getUserId(mockStorage)).toBe('string')
  })

  it("should generate different random strings if there's no localStorage available", () => {
    expect(getUserId()).not.toBe(getUserId())
  })

  it('should save the userId and return the same one if localStorage is available', () => {
    expect(getUserId(mockStorage)).toBe(getUserId(mockStorage))
  })

  it('should default to window.localStorage', () => {
    global.window.localStorage = mockStorage
    expect(getUserId()).toBe(getUserId())
    expect(typeof getUserId()).toBe('string')
  })
})
