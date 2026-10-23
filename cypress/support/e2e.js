// O site demoqa gera erros de JavaScript próprios que não têm relação com os testes
Cypress.on('uncaught:exception', () => false)

// Bloqueia os anúncios do site, que deixam a página lenta
beforeEach(() => {
  cy.intercept('**googlesyndication.com/**', { statusCode: 204 })
  cy.intercept('**doubleclick.net/**', { statusCode: 204 })
  cy.intercept('**adplus.js', { statusCode: 204 })
})
