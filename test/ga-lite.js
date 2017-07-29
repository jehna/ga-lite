import galite from '../src/ga-lite'
import { expect } from 'chai'

describe('galite', () => {
  it('should export a function', () => {
    expect(typeof galite).to.eql('function')
  })
})
