import { faker } from '@faker-js/faker'
import webTablesPage from '../../pages/WebTablesPage'

function gerarRegistro() {
  return {
    nome: faker.person.firstName(),
    sobrenome: faker.person.lastName(),
    email: faker.internet.email().toLowerCase(),
    idade: String(faker.number.int({ min: 18, max: 60 })),
    salario: String(faker.number.int({ min: 1000, max: 20000 })),
    departamento: faker.commerce.department()
  }
}

describe('Elements - Web Tables', () => {
  beforeEach(() => {
    webTablesPage.acessar()
  })

  it('deve criar, editar e deletar um registro', () => {
    const registro = gerarRegistro()

    webTablesPage.criarRegistro(registro)
    webTablesPage.buscar(registro.email)
    webTablesPage.linhaDoRegistro(registro.email).should('contain', registro.nome)

    webTablesPage.editarSalario(registro.email, '9999')
    webTablesPage.linhaDoRegistro(registro.email).should('contain', '9999')

    webTablesPage.deletar(registro.email)
    webTablesPage.validarQueNaoExiste(registro.email)
  })

  it('bônus: deve criar 12 registros e depois deletar todos', () => {
    const registros = []

    for (let i = 0; i < 12; i++) {
      const registro = gerarRegistro()
      registros.push(registro)
      webTablesPage.criarRegistro(registro)
    }

    registros.forEach((registro) => {
      webTablesPage.buscar(registro.email)
      webTablesPage.linhaDoRegistro(registro.email).should('exist')
    })

    // Bug do site: deletar um registro novo apaga todos os registros novos.
    // Por isso só deleto se o registro ainda estiver na tabela.
    registros.forEach((registro) => {
      webTablesPage.buscar(registro.email)
      cy.get('tbody').then((tabela) => {
        if (tabela.text().includes(registro.email)) {
          webTablesPage.deletar(registro.email)
        }
      })
    })

    registros.forEach((registro) => {
      webTablesPage.buscar(registro.email)
      webTablesPage.validarQueNaoExiste(registro.email)
    })
  })
})
