/// <reference types="Cypress" />///

describe('Central de Atendimento ao Cliente TAT', function(){
   beforeEach(function(){
      cy.visit('./src/index.html')
   })

    it('verifica o título da aplicação', function() {
       
       cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatoris e envia o formulario', function(){
      const longText = 'testando isso aqui de uma forma diferente ue nem sei como fazer mesmo mas nem vou corrigir as palavras que isso deve ser muito estranho'
      cy.get('#firstName').type('Carlos')
      cy.get('#lastName').type('Silva')
      cy.get('#email').type('carlos.silva@gmail.com')
      cy.get('#open-text-area').type(longText, {delay:0})
      cy.get('button[type="submit"]').click()

      cy.get('.success').should('be.visible')

   it('Exibe mensagem de erro ao submeter o formulario com um email com formatação invalida')
   cy.get('#firstName').type('Carlos')
   cy.get('#lastName').type('Silva')
   cy.get('#email').type('carlos.silva@gmail;com')
   cy.get('#open-text-area').type('Testando isso')
   cy.get('button[type="submit"]').click()
   
   cy.get('.error').should('be.visible')
   

   it('Campo telefone continua vazio qunado preenchido com um valor não-numerico', function() {
      cy.get('#phone')
      .type('abcdefghijk')
      .should('have.value','')
      
   })
   it('Exibe mensgem de erro uando o telefone se torna obrigatorio mas nao é preenchido', function()  {

      
      cy.get('#firstName').type('Carlos')
      cy.get('#lastName').type('Silva')
      cy.get('#email').type('carlos.silva@gmail;com')
      cy.get('#phone-checkbox').click()
      cy.get('#open-text-area').type('Testando isso')
      cy.get('button[type="submit"]').click()
      
      cy.get('.error').should('be.visible')
   
   })
   it.only('Preenhe e limpa os campos nome,sobrenome,email e telefone', function()  {
      cy.get('#firstName')
        .type('Carlos')
        .should('have.value', 'Carlos')
        .clear()
        ,should('have.value', ' ')
      cy.get('#lasttName')
        .type('Silva')
        .should('have.value', 'Silva')
        .clear()
        .should('have.value', '')
      cy.get('#email')
        .type('Carlos')
        .should('have.value', 'carlos.silva@gmail.com')
        .clear()
        ,should('have.value', ' ')
      cy.get('#phone')
        .type('123456789')
        .should('have.value', '123456789')
        .clear()
        .should('have.value', '')
        
   })
    })
   })