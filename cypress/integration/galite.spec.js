context('ga-lite', () => {
  beforeEach(() => {
    cy.visit('cypress/fixtures/index.html')
  })

  it('should respond correctly to pageview event', () => {
    cy.server()
    cy.route(/www.google-analytics.com\/collect/, '').as('gaCollect')
    cy.window().then(win => {
      cy.stub(win.navigator, 'sendBeacon')
      win.localStorage.setItem('uid', '11223344')
    })

    cy.window().invoke('galite', 'create', 'UA-54321')
    cy.window().invoke('galite', 'send', 'pageview')
    cy.wait('@gaCollect')

    cy.get('@gaCollect').should(xhr => {
      const url = new URL(xhr.url)

      expect(url.search).to.include('v=1&ul=en-us&de=UTF-8')
      expect(url.search).to.match(
        /&dl=http:\/\/localhost:\d+\/cypress\/fixtures\/index.html/
      )
      expect(url.search).to.include('&dt=')
      expect(url.search).to.include('&sd=24-bit')
      expect(url.search).to.include('&sr=928x1680')
      expect(url.search).to.include('vp=1000x660')
      expect(url.search).to.include('&dr=')
      expect(url.search).to.include('&cid=11223344')
      expect(url.search).to.include('&tid=UA-54321')
      expect(url.search).to.include('&t=pageview')
      expect(url.search).to.include('&z=')
    })
  })

  it('should not call endpoint if tracker has been disabled', () => {
    cy.server()
    cy.route(/www.google-analytics.com\/collect/, '').as('gaCollect')
    cy.window().then(win => {
      cy.stub(win.navigator, 'sendBeacon')
      win["ga-disable-UA-666"] = true
    })

    cy.window().invoke('galite', 'create', 'UA-666', 'auto', 'badTracker')
    cy.window().invoke('galite', 'create', 'UA-777', 'auto', 'goodTracker')
    cy.window().invoke('galite', 'goodTracker.send', 'pageview')
    cy.window().invoke('galite', 'badTracker.send', 'pageview')

    cy.get('@gaCollect').should(xhr => {
      const url = new URL(xhr.url)
      expect(url.search).to.include('&tid=UA-777')
      expect(url.search).not.to.include('&tid=UA-666')
    })

    cy.wait('@gaCollect')
  })
})
