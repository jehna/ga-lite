import { expect } from 'chai'

describe('ga-lite require script', () => {
  const requireGaLite = () => require('../../src/require-ga-lite')

  beforeEach(() => {
    global.window = {}
    global.document = {
      createElement: (elementType) => ({ elementType }),
      getElementsByTagName: () => [{ parentNode: { insertBefore: () => {} } }]
    }
  })

  afterEach(() => {
    delete global.window
    delete global.document
    delete require.cache[require.resolve('../../src/require-ga-lite')]
  })

  it('should create galite function under window', () => {
    requireGaLite()

    expect(global.window.galite).to.be.a('function')
  })

  it('should be able to save any arguments that are called to galite', () => {
    const args = ['hello', 'world']

    requireGaLite()
    global.window.galite(...args)

    expect(global.window.galite.q).to.be.an('array')
    expect([...global.window.galite.q[0]]).to.eql(args)
    
  })
})
