import getUserId from '../../src/get-user-id'
import MockStorage from './mock-storage'
import { expect } from 'chai'

describe('getUserId', () => {
  const mockStorage = new MockStorage()

  beforeEach(() => {
    global.window = { }
  })

  afterEach(() => {
    mockStorage.clear()
    delete global.window
  })

  it('should export a function', () => {
    expect(typeof getUserId).to.eql('function')
  })

  it('should generate a random string', () => {
    expect(typeof getUserId(mockStorage)).to.eql('string')
  })

  it(`should generate different random strings if there's no localStorage available`, () => {
    expect(getUserId()).not.to.eql(getUserId())
  })

  it('should save the userId and return the same one if localStorage is available', () => {
    expect(getUserId(mockStorage)).to.eql(getUserId(mockStorage))
  })

  it('should default to window.localStorage', () => {
    global.window.localStorage = mockStorage
    expect(getUserId()).to.eql(getUserId())
    expect(typeof getUserId()).to.eql('string')
  })
})
