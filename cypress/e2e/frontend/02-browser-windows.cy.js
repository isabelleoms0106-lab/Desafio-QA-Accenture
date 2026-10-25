import browserWindowsPage from '../../pages/BrowserWindowsPage'

describe('Alerts, Frame & Windows - Browser Windows', () => {
  it('deve abrir uma nova janela com a mensagem esperada', () => {
    browserWindowsPage.acessar()

    // O Cypress não controla uma segunda janela, então eu verifico se a janela
    // seria aberta com o endereço certo e depois abro esse endereço na mesma aba
    cy.window().then((win) => {
      cy.stub(win, 'open').as('novaJanela')
    })

    browserWindowsPage.clicarNovaJanela()

    cy.get('@novaJanela').should('be.calledWith', '/sample')
    browserWindowsPage.validarPaginaDaNovaJanela()

    // "Fecha" a nova janela voltando para a página original
    cy.go('back')
    browserWindowsPage.validarPaginaAberta()
  })
})
