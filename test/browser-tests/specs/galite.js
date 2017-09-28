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
      expect(req.url).to.include('/collect?v=1&ul=en-us&de=UTF-8')
      expect(req.url).to.include('&dl=http%3A%2F%2Flocalhost%3A8080%2F')
      expect(req.url).to.include('&dt=')
      expect(req.url).to.include('&sd=32-bit')
      expect(req.url).to.include('&sr=768x1024')
      expect(req.url).to.include('&vp=400x300')
      expect(req.url).to.include('&dr=')
      expect(req.url).to.include('&cid=12345')
      expect(req.url).to.include('&tid=UA-12345')
      expect(req.url).to.include('&t=pageview')
      expect(req.url).to.include('&z=')
    })
  })
})
