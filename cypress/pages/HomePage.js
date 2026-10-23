class HomePage {
  acessar() {
    cy.visit('/')
  }

  escolherOpcao(nome) {
    cy.contains('.card', nome).click()
  }

  clicarNoSubmenu(nome) {
    cy.contains('.router-link', nome).click()
  }
}

export default new HomePage()
