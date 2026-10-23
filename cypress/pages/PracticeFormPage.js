import homePage from './HomePage'

class PracticeFormPage {
  acessar() {
    homePage.acessar()
    homePage.escolherOpcao('Forms')
    homePage.clicarNoSubmenu('Practice Form')
    cy.url().should('include', '/automation-practice-form')
  }

  preencherFormulario(dados) {
    cy.get('#firstName').type(dados.nome)
    cy.get('#lastName').type(dados.sobrenome)
    cy.get('#userEmail').type(dados.email)
    cy.get('#genterWrapper').contains('label', dados.genero).click()
    cy.get('#userNumber').type(dados.celular)

    cy.get('#dateOfBirthInput').click()
    cy.get('.react-datepicker__year-select').select(dados.ano)
    cy.get('.react-datepicker__month-select').select(dados.mes)
    cy.get('.react-datepicker__day--0' + dados.dia + ':not(.react-datepicker__day--outside-month)').click()

    cy.get('#subjectsInput').type(dados.materia + '{enter}')
    cy.get('#hobbiesWrapper').contains('label', dados.hobby).click()
    cy.get('#currentAddress').type(dados.endereco)

    cy.get('#state input').type(dados.estado + '{enter}', { force: true })
    cy.get('#city input').type(dados.cidade + '{enter}', { force: true })
  }

  enviarArquivo(caminho) {
    cy.get('#uploadPicture').selectFile(caminho)
  }

  enviar() {
    cy.get('#submit').click()
  }

  validarPopupAberto(dados) {
    cy.get('#example-modal-sizes-title-lg').should('have.text', 'Thanks for submitting the form')
    cy.get('.modal-body').should('contain', dados.nome + ' ' + dados.sobrenome)
    cy.get('.modal-body').should('contain', dados.email)
    // "Male" também aparece dentro de "Female", por isso comparo o texto exato da célula
    cy.contains('td', 'Gender').next().should('have.text', dados.genero)
    cy.get('.modal-body').should('contain', dados.dia + ' ' + dados.mes + ',' + dados.ano)
    cy.get('.modal-body').should('contain', dados.materia)
    cy.get('.modal-body').should('contain', dados.hobby)
    cy.get('.modal-body').should('contain', 'arquivo-teste.txt')
    cy.get('.modal-body').should('contain', dados.estado + ' ' + dados.cidade)
  }

  fecharPopup() {
    // O botão Close do site não fecha o popup (bug do demoqa), então fecho com a tecla Esc
    cy.get('body').type('{esc}')
  }

  validarPopupFechado() {
    cy.get('.modal-content').should('not.exist')
  }
}

export default new PracticeFormPage()
