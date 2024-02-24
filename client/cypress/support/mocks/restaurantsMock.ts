export const getRestaurants = () => {
  let endpoint = '/api/restaurants';
  cy.intercept('GET', endpoint, {}).as('getRestaurants');
};
