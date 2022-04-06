describe('Submit Contact Info', () => {
    it('Submits info through the contact me form', () => {
//ARRANGE - fill in required fields for contact submission with valid data
        cy.visit('https://automationintesting.online/#/')
        //must not be blank
        cy.get('#name')
        .type('Cypress Test')
        
        //must not be blank
        //must be a well-formed email address
        cy.get('#email')
        .type('donotreply@betterlesson.com')
        
        //must not be blank
        //size must be between 11-21
        cy.get('#phone')
        .type('555-555-5555')
        
        //size must be between 5 and 100
        cy.get('#subject')
        .type('Cypress Test Subject')
        
        //size must be between 20 and 2000
        cy.get('#description').type('Test description meeting character length requirement')

//ACT -- click submit
        cy.intercept('POST', '/message/').as('submitContact')
        cy.get('#submitContact')
        .click()

//ASSERT -- verify that the server responds with status code of 201
        cy.wait('@submitContact').its('response.statusCode').should('equal', 201)
    })
})

  // Given more time I would have attempted a way to verify that the UI itself is updated with a confirmation of successful submission and the correct name and subject
  // I chose this approach because this seemed to provide the most value--the core "happy path" is tested
  // I would have also parametrized the test data in a separate json file in Fixtures as opposed to hard-coding the test values
  // I would design negative test cases, ideally for each field, to make sure that invalid input is not accepted, and it does not cause any front- or back-end errors
  // I would also design test cases to ensure that input is sanitized--i.e. the user cannot enter script into the input field to modify or corrupt the database


  // Notes: More useful error messages should indicate in which field the error occurred
  //     phone number input should probably strip dashes and have a minimum size of 10, or require dashes and have a 
  //     minimum size of 12--unclear as to why 11 is the minimum length (maybe country code?)
  // I noticed inconsistencies with the way the error messages were displayed during manual testing: with bad input, repeatedly
  //     clicking submit caused the order of the error messages to change