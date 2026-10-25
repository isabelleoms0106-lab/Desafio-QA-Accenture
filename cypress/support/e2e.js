// O site demoqa gera erros de JavaScript próprios que não têm relação com os testes
Cypress.on('uncaught:exception', () => false)
