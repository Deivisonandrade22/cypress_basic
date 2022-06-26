/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
   const THREE_SECONDS_IN_MS = 3000

   beforeEach(function () {
      cy.visit('./src/index.html')
   })

   it('verifica o título da aplicação', function() {

      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
   })

   it('preenche os campos obrigatoris e envia o formulario', function() {
      const longText = 'testando isso aqui de uma forma diferente ue nem sei como fazer mesmo mas nem vou corrigir as palavras que isso deve ser muito estranho'
      
      cy.clock()

      cy.get('#firstName').type('Carlos')
      cy.get('#lastName').type('Silva')
      cy.get('#email').type('carlos.silva@gmail.com')
      cy.get('#open-text-area').type(longText, { delay: 0 })
      cy.contains('button','Enviar').click()

      cy.get('.success').should('be.visible')

      cy.tick(THREE_SECONDS_IN_MS)

      cy.get('success').should('not.be.visible')
   })

      it('Exibe mensagem de erro ao submeter o formulario com um email com formatação invalida')
      Cypress.clock()

      cy.get('#firstName').type('Carlos')
      cy.get('#lastName').type('Silva')
      cy.get('#email').type('carlos.silva@gmail;com')
      cy.get('#open-text-area').type('Testando isso')
      cy.contains('button','Enviar').click()


      cy.get('.error').should('be.visible')

      cy.tick(THREE_SECONDS_IN_MS)

      cy.get('.error').should('not.be.visible')
   })
      Cypress._.times(3, function() {
      it('Campo telefone continua vazio qunado preenchido com um valor não-numerico', function() {
         cy.get('#phone')
            .type('abcdefghijk')
            .should('have.value', '')

      })
      })
      it('Exibe mensgem de erro uando o telefone se torna obrigatorio mas nao é preenchido', function() {

         cy.clock()

         cy.get('#firstName').type('Carlos')
         cy.get('#lastName').type('Silva')
         cy.get('#email').type('carlos.silva@gmail;com')
         cy.get('#phone-checkbox').check()
         cy.get('#open-text-area').type('Testando isso')
         cy.contains('button','Enviar').click()


         cy.get('.error').should('be.visible')

         cy.tick(THREE_SECONDS_IN_MS)

         cy.get('.error').should('not.be.visible')


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
        cy.clock()

         cy.contains('button','Enviar').click()


         cy.get('.error').should('be.visible')

         cy.tick(THREE_SECONDS_IN_MS)

         cy.get('.error').should('not.be.visible')

      })
      it('envia o formulario com sucesso usando um comanod customizado', function() {
        cy.clock()
         cy.fillMandatoryFieldsAndSubmit()

         cy.get('.success').should('.be.visible')

         cy.tick(THREE_SECONDS_IN_MS)

         cy.get('.succes').should('not.be.visible')

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

      it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
         cy.get('.success')
           .should('not.be.visible')
           .invoke('show')
           .should('be.visible')
           .and('contain', 'Mensagem enviada com sucesso.')
           .invoke('hide')
           .should('not.be.visible')
         cy.get('.error')
           .should('not.be.visible')
           .invoke('show')
           .should('be.visible')
           .and('contain', 'Valide os campos obrigatórios!')
           .invoke('hide')
           .should('not.be.visible')
       })
       it('preenche a area de texto usando o comndo invoke', function() {
         const longText = Cypress._.repeat('0123456789', 20)

         cy.get('#opnem-text-area')
            .invoke('val',longText)
            .should('have.value', longText)
       })

       it('faz uma requisição HTTP', function(){
         cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
         .should(function(response) {
            const {status, statusText, body } = response
            expect(status).to.equal(200)
            expect(statusText).to.equal('OK')
            expect(body).to.include('CAC TAT')
         })
       })
       it('Encontra o gato escondido', function(){
         cy.get('#cat')
            .invoke('show')
            .should('be.visible')
         cy.get('#title')
            .invoke('text', 'CAT TAT')
         cy.get('i#subtitle')
            .invoke('text', 'Eu ❤️ gatos!')
       })