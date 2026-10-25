# Desafio QA Automation - Accenture

Automação de testes do desafio de QA da Accenture usando o site [demoqa.com](https://demoqa.com).
O projeto tem testes de API e testes de frontend, feitos com Cypress e JavaScript, usando o padrão Page Object.

## Tecnologias

- JavaScript
- Cypress
- Faker (para gerar dados aleatórios)

## Pré-requisitos

- Node.js instalado (versão 18 ou maior)

## Como instalar

```bash
npm install
```

## Como rodar os testes

Abrindo a interface do Cypress:

```bash
npm run cy:open
```

Rodando todos os testes direto no terminal:

```bash
npm test
```

## Estrutura

```
cypress/
  e2e/
    api/          testes da API (Parte 1)
    frontend/     testes das telas (Parte 2)
  pages/          Page Objects de cada tela
  fixtures/       arquivo .txt usado no upload
  support/        configurações gerais
```

Os arquivos de teste são numerados (00 a 05) para rodarem na mesma ordem do desafio.

## O que foi feito

**Parte 1 - API (Book Store)**
- Criar usuário
- Gerar token
- Confirmar que o usuário está autorizado
- Listar os livros
- Alugar dois livros
- Listar os detalhes do usuário com os livros alugados

**Parte 2 - Frontend**
- Practice Form: preenche todo o formulário com dados aleatórios, faz upload de um .txt, envia, valida os dados no popup e fecha o popup
- Browser Windows: valida a nova janela com a mensagem "This is a sample page"
- Web Tables: cria, edita e deleta um registro (e o bônus: cria 12 registros e deleta todos)
- Progress Bar: para antes dos 25%, valida o valor e reseta depois de chegar em 100%
- Sortable: ordena os itens em ordem crescente com drag and drop

## Observações

- O Cypress não consegue controlar uma segunda janela do navegador. No teste de Browser Windows eu verifico que a janela seria aberta com o endereço `/sample`, abro esse endereço para validar a mensagem e depois volto para a página original, representando o fechamento da janela.
- Os testes de frontend seguem o caminho pedido no desafio: abrem a página inicial, escolhem a opção e clicam no submenu. Esses passos ficam no `HomePage.js`.
- No Sortable a lista já abre em ordem crescente. Para o drag and drop ser testado de verdade, o teste primeiro inverte a lista e depois coloca em ordem crescente.

## Problemas encontrados no site

- **Practice Form:** o botão "Close" do popup não fecha o popup. No teste ele é fechado com a tecla Esc.
- **Web Tables:** ao deletar um registro criado pelo usuário, todos os registros criados são deletados juntos. No bônus, o teste só deleta o registro se ele ainda estiver na tabela.
- **Progress Bar:** depois de clicar em "Reset" a barra volta para o início, mas continua andando sozinha. No teste eu valido que ela voltou para perto de 0.
