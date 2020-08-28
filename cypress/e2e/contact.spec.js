describe(`Contact page`, () => {
    beforeEach(() => {
        cy.visit(`/contact`)
        cy.wait(500)
    })

    it(`Displays a contact form with a submit button`, () => {
        cy.contains('name').find('input').type('Leia Organa (from tests)')
        cy.contains('email').find('input').type('leia+tests@organa.com')
        cy.contains('message').find('tetarea').type('Lorem Ipsum Dolor Sit Amet')
        // cy.get('form').find('input'). TODO Check submit button attrs
    })
})
