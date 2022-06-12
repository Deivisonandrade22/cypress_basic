/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
   beforeEach(function () {
      cy.visit('./src/index.html')
   })

   it('verifica o título da aplicação', function() {

      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
   })

   it('preenche os campos obrigatoris e envia o formulario', function() {
      const longText = 'testando isso aqui de uma forma diferente ue nem sei como fazer mesmo mas nem vou corrigir as palavras que isso deve ser muito estranho'
      cy.get('#firstName').type('Carlos')
      cy.get('#lastName').type('Silva')
      cy.get('#email').type('carlos.silva@gmail.com')
      cy.get('#open-text-area').type(longText, { delay: 0 })
      cy.contains('button','Enviar').click()

      cy.get('.success').should('be.visible')

      it('Exibe mensagem de erro ao submeter o formulario com um email com formatação invalida')
      cy.get('#firstName').type('Carlos')
      cy.get('#lastName').type('Silva')
      cy.get('#email').type('carlos.silva@gmail;com')
      cy.get('#open-text-area').type('Testando isso')
      cy.contains('button','Enviar').click()


      cy.get('.error').should('be.visible')


      it('Campo telefone continua vazio qunado preenchido com um valor não-numerico', function() {
         cy.get('#phone')
            .type('abcdefghijk')
            .should('have.value', '')

      })
      it('Exibe mensgem de erro uando o telefone se torna obrigatorio mas nao é preenchido', function() {

         cy.get('#firstName').type('Carlos')
         cy.get('#lastName').type('Silva')
         cy.get('#email').type('carlos.silva@gmail;com')
         cy.get('#phone-checkbox').check()
         cy.get('#open-text-area').type('Testando isso')
         cy.contains('button','Enviar').click()


         cy.get('.error').should('be.visible')

      })
      it('Preenhe e limpa os campos nome,sobrenome,email e telefone', function() {
         cy.get('#firstName')
            .type('Carlos')
            .should('have.value', 'Carlos')
            .clear()
            , should('have.value', ' ')
         cy.get('#lasttName')
            .type('Silva')
            .should('have.value', 'Silva')
            .clear()
            .should('have.value', '')
         cy.get('#email')
            .type('Carlos')
            .should('have.value', 'carlos.silva@gmail.com')
            .clear()
            , should('have.value', ' ')
         cy.get('#phone')
            .type('123456789')
            .should('have.value', '123456789')
            .clear()
            .should('have.value', '')

      })
      it('exibe mensagem de erro ao submeter o formulario sem preencher os campos obrigatorios', function () {
         cy.contains('button','Enviar').click()


         cy.get('.error').should('be.visible')

      })
      it('envia o formulario com sucesso usando um comanod customizado', function() {
         cy.fillMandatoryFieldsAndSubmit()

      })
      it ('seleciona um produto (youtube) por texto', function() {
         cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
         })
      it('seleciona um produto (Mentoria) por seu valor (value)', function(){
         cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')

      })
      it('Seleciona um rproduto (blog) por seu indice', function(){
         cy.get('#product')
         .select(1)
         .should('have.value', 'blog')
      })
      it('marca o tipo e atendimento"Feedback"', function() {
         cy.get('input[type="radio"][value="Feedback"]')
         .check()
         .should('have.value', 'feedback')

      })
      it('marca cada tipo de atendimento', function(){
         cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio){
               cy.wrap($radio).check()
               cy.wrap($radio).should('be.checked')
            })
      })
      it('marca ambos checkbox, depois desmarca o ultimo', function() {
         cy.get('input[types="checkbox"]')
            .check()
            .should('not.be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')

      })
      it('seleciona um arquivo da pasta fixtures', function(){
         cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress.fixtures/example.json')
            .should(function($input) {
               expect($input[0].files[0].name).to.equal('example.json')
            })
            })
      it('seleciona um arquivo simulando um drag-and-drop', function() {
         cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress.fixtures/example.json', {action:'drag-drop'})
            .should(function($input) {
               expect($input[0].files[0].name).to.equal('example.json')
      })
      })
      it('seleciona um arquivo utilizando um fixture para a qual foi dada um alias', function()  {
         cy.fixture('example.json').as('sampleFile')
         cy.get('input[type="file"]')
             .selectFile('@sampleFile')
             .should(function($input) {
               expect($input[0].files[0].name).to.equal('example.json')
      
            })
         })
      it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
         cy.get('#privacy a').should('have.attr', 'target', '_blank')
      })
      it('acessa a página da política de privacidade removendo o target e então clicanco no link', function()  {
         cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

         cy.contains('Talking About Testing'). should('be.visible')
      })
   })