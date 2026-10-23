describe('API - Livraria', () => {
  // Nome diferente a cada execução para não dar erro de usuário já existente
  const usuario = {
    userName: 'qa_' + Date.now(),
    password: 'Teste@123'
  }

  let userId
  let token
  let isbns

  it('deve criar um usuário', () => {
    cy.request('POST', '/Account/v1/User', usuario).then((resposta) => {
      expect(resposta.status).to.eq(201)
      expect(resposta.body.username).to.eq(usuario.userName)
      userId = resposta.body.userID
    })
  })

  it('deve gerar um token', () => {
    cy.request('POST', '/Account/v1/GenerateToken', usuario).then((resposta) => {
      expect(resposta.status).to.eq(200)
      expect(resposta.body.status).to.eq('Success')
      expect(resposta.body.token).to.exist
      token = resposta.body.token
    })
  })

  it('deve confirmar que o usuário está autorizado', () => {
    cy.request('POST', '/Account/v1/Authorized', usuario).then((resposta) => {
      expect(resposta.status).to.eq(200)
      expect(resposta.body).to.eq(true)
    })
  })

  it('deve listar os livros disponíveis', () => {
    cy.request('GET', '/BookStore/v1/Books').then((resposta) => {
      expect(resposta.status).to.eq(200)
      expect(resposta.body.books.length).to.be.greaterThan(1)
      isbns = [resposta.body.books[0].isbn, resposta.body.books[1].isbn]
    })
  })

  it('deve alugar dois livros', () => {
    cy.request({
      method: 'POST',
      url: '/BookStore/v1/Books',
      headers: { Authorization: 'Bearer ' + token },
      body: {
        userId: userId,
        collectionOfIsbns: [{ isbn: isbns[0] }, { isbn: isbns[1] }]
      }
    }).then((resposta) => {
      expect(resposta.status).to.eq(201)
    })
  })

  it('deve listar os detalhes do usuário com os livros alugados', () => {
    cy.request({
      method: 'GET',
      url: '/Account/v1/User/' + userId,
      headers: { Authorization: 'Bearer ' + token }
    }).then((resposta) => {
      expect(resposta.status).to.eq(200)
      expect(resposta.body.books).to.have.length(2)
      expect(resposta.body.books[0].isbn).to.eq(isbns[0])
      expect(resposta.body.books[1].isbn).to.eq(isbns[1])
    })
  })
})
