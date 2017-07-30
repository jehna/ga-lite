import objectToQueryString from '../../src/object-to-query-string'
import { expect } from 'chai'

describe('objectToQueryString', () => {
  it('should export a function', () => {
    expect(typeof objectToQueryString).to.eql('function')
  })

  it('should return empty string if no arguments passed', () => {
    expect(objectToQueryString()).to.equal('')
  })

  it('should return key=value on simple object', () => {
    expect(objectToQueryString({ key: 'value' })).to.equal('key=value')
  })

  it('should url escape both key and value', () => {
    expect(objectToQueryString({ 'hello world': 'going strong' })).to.equal('hello%20world=going%20strong')
  })

  it('should join query strings properly', () => {
    expect(objectToQueryString({ hello: 'world', foo: 'bar' })).to.equal('hello=world&foo=bar')
  })
})
