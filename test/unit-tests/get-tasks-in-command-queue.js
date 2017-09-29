import getTasksInCommandQueue from '../../src/get-tasks-in-command-queue'
import { expect } from 'chai'

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
    expect(getTasksInCommandQueue).to.be.a('function')
  })

  it('should return empty array if there is no window object', () => {
    delete global.window

    expect(getTasksInCommandQueue()).to.eql([])
  })

  it('should return empty array if galite object is not defined', () => {
    delete global.window.galite

    expect(getTasksInCommandQueue()).to.eql([])
  })

  it('should return exactly the array in window.galite.q', () => {
    const expected = ['hello', 'world']
    global.window.galite.q = expected

    expect(getTasksInCommandQueue()).to.equal(expected)
  })
})
