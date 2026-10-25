import homePage from './HomePage'

class SortablePage {
  acessar() {
    homePage.acessar()
    homePage.escolherOpcao('Interactions')
    homePage.clicarNoSubmenu('Sortable')
    cy.url().should('include', '/sortable')
  }

  itens() {
    return cy.get('.vertical-list-container .list-group-item')
  }

  arrastar(textoOrigem, textoDestino) {
    const dataTransfer = new DataTransfer()

    cy.contains('.vertical-list-container .list-group-item', textoOrigem)
      .trigger('dragstart', { dataTransfer })

    cy.contains('.vertical-list-container .list-group-item', textoDestino)
      .trigger('dragenter', 'top', { dataTransfer })
      .trigger('dragover', 'top', { dataTransfer })
      .trigger('drop', 'top', { dataTransfer })

    cy.contains('.vertical-list-container .list-group-item', textoOrigem)
      .trigger('dragend', { dataTransfer })
  }
}

export default new SortablePage()
