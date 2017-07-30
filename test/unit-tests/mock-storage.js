class MockStorage {
  constructor () {
    this.clear()
  }
  getItem (key) { return this.storage[key] }
  setItem (key, value) { this.storage[key] = value }
  clear () { this.storage = {} }
}

export default MockStorage
