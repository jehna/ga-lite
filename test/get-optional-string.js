import getOptionalStr from '../src/get-optional-string'
import { expect } from 'chai'

describe('getOptionalStr', () => {
  it('should export a function', () => {
    expect(typeof getOptionalStr).to.eql('function')
  })

  it(`should return an empty string if there's no input`, () => {
    expect(getOptionalStr()).to.eql('')
  })

  it(`should return an empty string if the input has any undefined values`, () => {
    expect(getOptionalStr(['hello', 'world', undefined])).to.eql('')
  })

  it(`should concatenate the array`, () => {
    expect(getOptionalStr(['hello', 'world'])).to.eql('helloworld')
  })

  it(`should url escape any of the input values`, () => {
    expect(getOptionalStr(['hello', ' ', 'world & space!'])).to.eql('hello%20world%20%26%20space!')
  })
})
