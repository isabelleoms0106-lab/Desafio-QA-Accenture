import sortablePage from '../../pages/SortablePage'

function validarOrdem(ordemEsperada) {
  ordemEsperada.forEach((texto, posicao) => {
    sortablePage.itens().eq(posicao).should('have.text', texto)
  })
}

describe('Interactions - Sortable', () => {
  it('deve colocar os itens em ordem crescente', () => {
    sortablePage.acessar()

    // A lista já abre em ordem crescente, então primeiro eu inverto
    // para depois testar a ordenação crescente com o drag and drop
    sortablePage.arrastar('Six', 'One')
    sortablePage.arrastar('Five', 'One')
    sortablePage.arrastar('Four', 'One')
    sortablePage.arrastar('Three', 'One')
    sortablePage.arrastar('Two', 'One')
    validarOrdem(['Six', 'Five', 'Four', 'Three', 'Two', 'One'])

    sortablePage.arrastar('One', 'Six')
    sortablePage.arrastar('Two', 'Six')
    sortablePage.arrastar('Three', 'Six')
    sortablePage.arrastar('Four', 'Six')
    sortablePage.arrastar('Five', 'Six')
    validarOrdem(['One', 'Two', 'Three', 'Four', 'Five', 'Six'])
  })
})
