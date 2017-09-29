import fieldsToParams from '../../src/fields-to-params'
import { expect } from 'chai'

describe('fieldsToParams', () => {
  it('should export a function', () => {
    expect(fieldsToParams).to.be.a('function')
  })

  it('should convert some random fields correctly', () => {
    const input = {
      hitType: 'event',
      eventCategory: 'social',
      eventAction: 'like',
      eventLabel: 'Like!',
      eventValue: 10
    }

    const output = {
      t: 'event',
      ec: 'social',
      ea: 'like',
      el: 'Like!',
      ev: 10
    }
    expect(fieldsToParams(input)).to.eql(output)
  })
})
