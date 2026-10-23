import homePage from './HomePage'

class WebTablesPage {
  acessar() {
    homePage.acessar()
    homePage.escolherOpcao('Elements')
    homePage.clicarNoSubmenu('Web Tables')
    cy.url().should('include', '/webtables')
  }

  criarRegistro(registro) {
    cy.get('#addNewRecordButton').click()
    cy.get('#firstName').type(registro.nome)
    cy.get('#lastName').type(registro.sobrenome)
    cy.get('#userEmail').type(registro.email)
    cy.get('#age').type(registro.idade)
    cy.get('#salary').type(registro.salario)
    cy.get('#department').type(registro.departamento)
    cy.get('#submit').click()
  }

  // A tabela mostra só 10 linhas por página, por isso eu busco pelo email antes
  buscar(texto) {
    cy.get('#searchBox').clear().type(texto)
  }

  linhaDoRegistro(email) {
    return cy.contains('tr', email)
  }

  editarSalario(email, novoSalario) {
    this.linhaDoRegistro(email).find('[id^="edit-record"]').click()
    cy.get('#salary').clear().type(novoSalario)
    cy.get('#submit').click()
  }

  deletar(email) {
    this.linhaDoRegistro(email).find('[id^="delete-record"]').click()
  }

  validarQueNaoExiste(email) {
    cy.contains('tr', email).should('not.exist')
  }
}

export default new WebTablesPage()
