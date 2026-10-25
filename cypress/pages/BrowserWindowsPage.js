import homePage from './HomePage'

class BrowserWindowsPage {
  acessar() {
    homePage.acessar()
    homePage.escolherOpcao('Alerts, Frame & Windows')
    homePage.clicarNoSubmenu('Browser Windows')
    cy.url().should('include', '/browser-windows')
  }

  clicarNovaJanela() {
    cy.get('#windowButton').click()
  }

  validarPaginaDaNovaJanela() {
    cy.visit('/sample')
    cy.get('#sampleHeading').should('have.text', 'This is a sample page')
  }

  validarPaginaAberta() {
    cy.url().should('include', '/browser-windows')
    cy.get('#windowButton').should('be.visible')
  }
}

export default new BrowserWindowsPage()
