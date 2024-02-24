describe('Restaurant inner page', () => {
  beforeEach(() => {
    cy.visit('/restaurants/65bfd797638ed223ce293434');
    cy.intercept('GET', 'http://localhost:8080/api/v1/restaurants', { fixture: 'restaurants_mock_data.json' }).as(
      'getRestaurants',
    );
  });

  it('should render restaurant page', () => {});
});
