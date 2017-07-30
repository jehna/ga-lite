import getOptionalUrlParam from '../../src/get-optional-url-param'
import { expect } from 'chai'

describe('getOptionalUrlParam', () => {
  it('should export a function', () => {
    expect(typeof getOptionalUrlParam).to.eql('function')
  })

  it(`should return an empty string if there's no input`, () => {
    expect(getOptionalUrlParam()).to.eql('')
  })

  it(`should return an empty string if the input has any undefined values`, () => {
    expect(getOptionalUrlParam('key', ['hello', 'world', undefined])).to.eql('')
  })

  it(`should concatenate the array`, () => {
    expect(getOptionalUrlParam('key', ['hello', 'world'])).to.eql('&key=helloworld')
  })

  it(`should url escape any of the input values`, () => {
    expect(getOptionalUrlParam('key', ['hello', ' ', 'world & space!'])).to.eql('&key=hello%20world%20%26%20space!')
  })
})
