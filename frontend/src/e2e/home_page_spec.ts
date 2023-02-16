describe('Home page', () => {
    it('Loads successfully', () => {
      cy.visit('/');
      cy.contains('Welcome to our e-commerce store');
    });
  
    it('Displays featured products', () => {
      cy.visit('/');
      cy.get('.featured-products')
        .should('be.visible')
        .find('.product-card')
        .should('have.length', 4);
    });
  });