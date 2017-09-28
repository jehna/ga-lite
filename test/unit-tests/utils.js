import URL from 'url'
import querystring from 'querystring'
import { expect } from 'chai'

export function assertUrlsEqual (url1, url2) {
  const builtUrl = URL.parse(url1)
  const expectedUrl = URL.parse(url2)

  const builtQueryString = querystring.parse(builtUrl.search)
  const expectedQueryString = querystring.parse(expectedUrl.search)

  expect(builtUrl.hostname).to.eql(expectedUrl.hostname)
  expect(builtUrl.protocol).to.eql(expectedUrl.protocol)
  expect(builtQueryString).to.eql(expectedQueryString)
}

export function assertSentTo (url, done) {
  return (matchUrl) => {
    assertUrlsEqual(url, matchUrl)
    done()
  }
}
