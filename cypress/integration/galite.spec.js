context('ga-lite', () => {
  beforeEach(() => {
    cy.visit('cypress/fixtures/index.html')
  })

  it('should respond correctly to pageview event', async () => {
    cy.server()
    cy.route(/www.google-analytics.com\/collect/, '').as('gaCollect')
    cy.window().then(win => cy.stub(win.navigator, 'sendBeacon'))
    cy.window().invoke('galite', 'send', 'pageview')
    cy.wait('@gaCollect')

    cy.get('@gaCollect').should(xhr => {
      const url = new URL(xhr.url)

      expect(url.search).to.include('v=1&ul=en-us&de=UTF-8')
      expect(url.search).to.include(
        '&dl=http://localhost:64947/cypress/fixtures/index.html'
      )
      expect(url.search).to.include('&dt=')
      expect(url.search).to.include('&sd=24-bit')
      expect(url.search).to.include('&sr=928x1680')
      expect(url.search).to.include('vp=1000x660')
      expect(url.search).to.include('&dr=')
      expect(url.search).to.include('&cid=12345')
      expect(url.search).to.include('&tid=UA-12345')
      expect(url.search).to.include('&t=pageview')
      expect(url.search).to.include('&z=')
    })
  })
})
