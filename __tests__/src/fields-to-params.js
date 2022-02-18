import fieldsToParams from '../../src/fields-to-params'

describe('fieldsToParams', () => {
  it('should export a function', () => {
    expect(fieldsToParams).toBeInstanceOf(Function)
  })

  it('should convert some random fields correctly', () => {
    const input = {
      hitType: 'event',
      eventCategory: 'social',
      eventAction: 'like',
      eventLabel: 'Like!',
      eventValue: 10,
      metric1: 'howdy',
      dimension22: 17
    }

    const output = {
      t: 'event',
      ec: 'social',
      ea: 'like',
      el: 'Like!',
      ev: 10,
      cm1: 'howdy',
      cd22: 17
    }
    expect(fieldsToParams(input)).toStrictEqual(output)
  })

  it('should pass 0 as it is, but omit empty string, null and undefined values', () => {
    const input = {
      hitType: 'event',
      eventCategory: 'social',
      eventAction: 'like',
      eventLabel: null,
      eventValue: 0,
      metric1: '',
      dimension22: undefined
    }

    const output = {
      t: 'event',
      ec: 'social',
      ev: 0,
      ea: 'like'
    }
    expect(fieldsToParams(input)).toStrictEqual(output)
  })
})
