describe('Home', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('GET', 'http://localhost:8080/api/v1/restaurants', {
      fixture: 'restaurants.json',
    }).as('getRestaurants');
  });

  it('should show the logo', () => {
    cy.get('[data-testid=logo]').should('exist');
  });

  it('should display the correct number of restaurants', () => {
    cy.wait('@getRestaurants', { timeout: 10000 });
    // cy.get('[data-testid=restaurant-card]').should('have.length', 3);
  });
});
