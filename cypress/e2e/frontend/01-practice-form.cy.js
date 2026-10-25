import { faker } from '@faker-js/faker'
import practiceFormPage from '../../pages/PracticeFormPage'

describe('Forms - Practice Form', () => {
  it('deve preencher e enviar o formulário', () => {
    const local = faker.helpers.arrayElement([
      { estado: 'NCR', cidade: 'Delhi' },
      { estado: 'Uttar Pradesh', cidade: 'Lucknow' },
      { estado: 'Haryana', cidade: 'Karnal' },
      { estado: 'Rajasthan', cidade: 'Jaipur' }
    ])

    const dados = {
      nome: faker.person.firstName(),
      sobrenome: faker.person.lastName(),
      email: faker.internet.email(),
      genero: faker.helpers.arrayElement(['Male', 'Female', 'Other']),
      celular: faker.string.numeric(10),
      // Dia até 28 para existir em todos os meses, sempre com 2 dígitos (ex.: 05)
      dia: String(faker.number.int({ min: 1, max: 28 })).padStart(2, '0'),
      mes: faker.date.month(),
      ano: String(faker.number.int({ min: 1980, max: 2005 })),
      materia: faker.helpers.arrayElement(['Maths', 'English', 'Physics', 'Chemistry']),
      hobby: faker.helpers.arrayElement(['Sports', 'Reading', 'Music']),
      endereco: faker.location.streetAddress(),
      estado: local.estado,
      cidade: local.cidade
    }

    practiceFormPage.acessar()
    practiceFormPage.preencherFormulario(dados)
    practiceFormPage.enviarArquivo('cypress/fixtures/arquivo-teste.txt')
    practiceFormPage.enviar()

    practiceFormPage.validarPopupAberto(dados)
    practiceFormPage.fecharPopup()
    practiceFormPage.validarPopupFechado()
  })
})
