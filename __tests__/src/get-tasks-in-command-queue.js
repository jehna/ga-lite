import getTasksInCommandQueue from '../../src/get-tasks-in-command-queue'

describe('getTasksInCommandQueue', () => {
  beforeEach(() => {
    global.window = {
      galite: {
        q: []
      }
    }
  })

  afterEach(() => {
    delete global.window
  })

  it('should export a function', () => {
    expect(getTasksInCommandQueue).toBeInstanceOf(Function)
  })

  it('should return empty array if there is no window object', () => {
    delete global.window

    expect(getTasksInCommandQueue()).toStrictEqual([])
  })

  it('should return empty array if galite object is not defined', () => {
    delete global.window.galite

    expect(getTasksInCommandQueue()).toStrictEqual([])
  })

  it('should return exactly the array in window.galite.q', () => {
    const expected = ['hello', 'world']
    global.window.galite.q = expected

    expect(getTasksInCommandQueue()).toStrictEqual(expected)
  })
})
