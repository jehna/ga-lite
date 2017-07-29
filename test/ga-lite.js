import galite from '../src/ga-lite'
import { expect } from 'chai'
import { clearStore, getAllTrackers } from '../src/tracker-store'

describe('galite', () => {
  beforeEach(() => {
    global.window = {}
    global.navigator = {}
  })

  afterEach(() => {
    delete global.window
    delete global.navigator
    clearStore()
  })

  it('should export a function', () => {
    expect(typeof galite).to.eql('function')
  })

  it(`should throw when there's no command available`, () => {
    expect(() => galite('this command sholud not exist')).to.throw()
  })

  it(`should not throw on "create" command`, () => {
    expect(() => galite('create', 'UA-XXXXXX')).to.not.throw()
  })

  it(`should create a new tracker on "create" command`, () => {
    galite('create', 'UA-XXXXXX')
    expect(getAllTrackers().length).to.eql(1)
  })
})
