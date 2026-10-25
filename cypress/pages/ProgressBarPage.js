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

  barra() {
    return cy.get('[role="progressbar"]')
  }

  esperarChegarEm100() {
    cy.get('[role="progressbar"]', { timeout: 20000 }).should('have.attr', 'aria-valuenow', '100')
  }

  validarBotaoStart() {
    cy.get('#startStopButton').should('have.text', 'Start')
  }
}

export default new ProgressBarPage()
