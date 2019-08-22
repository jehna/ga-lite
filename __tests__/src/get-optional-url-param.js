import getOptionalUrlParam from '../../src/get-optional-url-param'

describe('getOptionalUrlParam', () => {
  it('should export a function', () => {
    expect(getOptionalUrlParam).toBeInstanceOf(Function)
  })

  it("should return an empty string if there's no input", () => {
    expect(getOptionalUrlParam()).toBe('')
  })

  it('should return an empty string if the input has any undefined values', () => {
    expect(getOptionalUrlParam('key', ['hello', 'world', undefined])).toBe('')
  })

  it('should concatenate the array', () => {
    expect(getOptionalUrlParam('key', ['hello', 'world'])).toBe(
      '&key=helloworld'
    )
  })

  it('should url escape any of the input values', () => {
    expect(getOptionalUrlParam('key', ['hello', ' ', 'world & space!'])).toBe(
      '&key=hello%20world%20%26%20space!'
    )
  })
})
