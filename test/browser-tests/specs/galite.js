const { expect } = require('chai')
const express = require('express')
const path = require('path')

function createServer () {
  return new Promise((resolve, reject) => {
    const app = express()
    app.use('/js', express.static(path.join(__dirname, '../../../dist/')))
    app.use(express.static(path.join(__dirname, '../html/')))

    app.all('/collect', (req, res) => {
      res.send('OK')
      server.close()
      resolve(req)
    })

    const server = app.listen(8080)
  })
}

describe('simple events', () => {
  it('should respond correctly to pageview event', () => {
    const promise = createServer()

    browser.url('http://localhost:8080/')
    browser.execute(function () { window.galite('send', 'pageview') })
    return promise.then(req => {
      expect(req.url).to.include(
        '/collect?v=1&ul=en-us&de=UTF-8' +
        '&dl=http%3A%2F%2Flocalhost%3A8080%2F' +
        '&dt=' +
        '&sd=32-bit' +
        '&sr=768x1024' +
        '&vp=400x300' +
        '&dr=' +
        '&cid=12345' +
        '&tid=UA-12345' +
        '&t=pageview' +
        '&z='
      )
    })
  })
})
