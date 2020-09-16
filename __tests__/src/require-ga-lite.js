describe('ga-lite require script', () => {
  const requireGaLite = () => require('../../src/require-ga-lite')

  beforeEach(() => {
    global.window = {}
    global.document.createElement = (elementType) => ({ elementType })
    global.document.getElementsByTagName = () => [
      { parentNode: { insertBefore: () => {} } }
    ]
  })

  afterEach(() => {
    delete global.windowx
    delete global.document.createElement
    delete global.document.getElementsByTagName
    delete require.cache[require.resolve('../../src/require-ga-lite')]
  })

  it('should create galite function under window', () => {
    requireGaLite()

    expect(global.window.galite).toBeInstanceOf(Function)
  })

  it('should be able to save any arguments that are called to galite', () => {
    const args = ['hello', 'world']

    requireGaLite()
    global.window.galite(...args)

    expect(global.window.galite.q).toBeInstanceOf(Array)
    expect([...global.window.galite.q[0]]).toStrictEqual(args)
  })
})
