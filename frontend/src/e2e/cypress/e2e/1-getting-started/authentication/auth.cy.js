describe("Register E2E UI Tests", () => {

      it('Display Register UI Components', () => {
        cy.get('.todo-list li').should('have.length', 2)
      })    
})
