describe(`Contact form`, () => {

    beforeEach(() => {
        cy.visit(`/contact`)
        cy.wait(500)
    })

    it(`Title exists`, () => {
        cy.contains('Contact me')
    })

    it(`Displays a contact form with a submit button`, () => {
        cy.get('form').contains('Name')
        cy.get('form').find('input[name="name"]').should(`have.attr`, `placeholder`, `Jane Doe`)
        cy.get('form').contains('Email')
        cy.get('form').find('input[name="email"]').should(`have.attr`, `placeholder`, `jane@doe.com`)
        cy.get('form').contains('Message')
        cy.get('form').find('textarea[name="message"]')
        cy.get('form').find('input[type="submit"]').should(`have.attr`, `value`, `Send Message`)
    })

    it(`Does not submit if email is missing`, () => {
        cy.get('form').find('textarea[name="message"]').type('Lorem Ipsum Dolor Sit Amet')
        cy.get('form').find('input[type="submit"]').click()
        cy.get('.info-msg').should('not.exist')
    })

    it(`Does not submit if message is missing`, () => {
        cy.get('form').find('input[name="email"]').type('leia+tests@organa.com')
        cy.get('form').find('input[type="submit"]').click()
        cy.get('.info-msg').should('not.exist')
    })
})
