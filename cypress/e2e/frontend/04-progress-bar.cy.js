import progressBarPage from '../../pages/ProgressBarPage'

describe('Widgets - Progress Bar', () => {
  it('deve parar antes dos 25% e resetar ao chegar em 100%', () => {
    progressBarPage.acessar()

    progressBarPage.clicarStartStop()
    cy.wait(1000)
    progressBarPage.clicarStartStop()

    progressBarPage.barra().invoke('attr', 'aria-valuenow').then((valor) => {
      expect(Number(valor)).to.be.greaterThan(0).and.lte(25)
    })

    progressBarPage.clicarStartStop()
    progressBarPage.barra({ timeout: 20000 }).should('have.attr', 'aria-valuenow', '100')

    // Depois do reset o site volta a barra para o início, mas ela continua andando sozinha,
    // por isso valido que voltou para perto de 0 e não exatamente 0
    progressBarPage.clicarReset()
    progressBarPage.barra().should((barra) => {
      expect(Number(barra.attr('aria-valuenow'))).to.be.lte(10)
    })
    cy.get('#startStopButton').should('have.text', 'Start')
  })
})
