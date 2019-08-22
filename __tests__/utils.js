import { URL } from 'url'
import querystring from 'querystring'

export function assertUrlsEqual(url1, url2) {
  const builtUrl = new URL(url1)
  const expectedUrl = new URL(url2)

  const builtQueryString = querystring.parse(builtUrl.search)
  const expectedQueryString = querystring.parse(expectedUrl.search)

  expect(builtUrl.hostname).toBe(expectedUrl.hostname)
  expect(builtUrl.protocol).toBe(expectedUrl.protocol)
  expect(builtQueryString).toStrictEqual(expectedQueryString)
}

export function assertSentTo(url, done) {
  return matchUrl => {
    assertUrlsEqual(url, matchUrl)
    done()
  }
}
