import sortablePage from '../../pages/SortablePage'

const ordemCrescente = ['One', 'Two', 'Three', 'Four', 'Five', 'Six']
const ordemDecrescente = ['Six', 'Five', 'Four', 'Three', 'Two', 'One']

function validarOrdem(ordemEsperada) {
  sortablePage.itens().should((itens) => {
    const textos = itens.map((i, item) => item.innerText).get()
    expect(textos).to.deep.eq(ordemEsperada)
  })
}

describe('Interactions - Sortable', () => {
  it('deve colocar os itens em ordem crescente', () => {
    sortablePage.acessar()

    // A lista já abre em ordem crescente, então primeiro eu inverto
    // para depois testar a ordenação crescente com o drag and drop
    sortablePage.ordenar(ordemDecrescente)
    validarOrdem(ordemDecrescente)

    sortablePage.ordenar(ordemCrescente)
    validarOrdem(ordemCrescente)
  })
})
