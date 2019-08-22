import objectToQueryString from '../../src/object-to-query-string'

describe('objectToQueryString', () => {
  it('should export a function', () => {
    expect(objectToQueryString).toBeInstanceOf(Function)
  })

  it('should return empty string if no arguments passed', () => {
    expect(objectToQueryString()).toBe('')
  })

  it('should return key=value on simple object', () => {
    expect(objectToQueryString({ key: 'value' })).toBe('key=value')
  })

  it('should url escape both key and value', () => {
    expect(objectToQueryString({ 'hello world': 'going strong' })).toBe(
      'hello%20world=going%20strong'
    )
  })

  it('should join query strings properly', () => {
    expect(objectToQueryString({ hello: 'world', foo: 'bar' })).toBe(
      'hello=world&foo=bar'
    )
  })
})
