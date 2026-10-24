import homePage from './HomePage'

class ProgressBarPage {
  acessar() {
    homePage.acessar()
    homePage.escolherOpcao('Widgets')
    homePage.clicarNoSubmenu('Progress Bar')
    cy.url().should('include', '/progress-bar')
  }

  clicarStartStop() {
    cy.get('#startStopButton').click()
  }

  clicarReset() {
    cy.get('#resetButton').click()
  }

  barra(opcoes) {
    return cy.get('[role="progressbar"]', opcoes)
  }
}

export default new ProgressBarPage()
