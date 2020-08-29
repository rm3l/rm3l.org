describe(`Contact form`, () => {

    it(`Displays a contact form with a submit button`, () => {
        cy.visit(`/contact`)
        cy.wait(500)

        cy.contains('Contact me')

        cy.get('form').should('have.attr', 'method', 'post')
        cy.get('form').should('have.attr', 'action', '/contact_success')
        cy.get('form').contains('Name')
        cy.get('form').find('input[name="name"]').should(`have.attr`, `placeholder`, `Jane Doe`).type('Leia Organa (from tests)')
        cy.get('form').contains('Email')
        cy.get('form').find('input[name="email"]').should(`have.attr`, `placeholder`, `jane@doe.com`).type('leia+tests@organa.com')
        cy.get('form').contains('Message')
        cy.get('form').find('textarea[name="message"]').type('Lorem Ipsum Dolor Sit Amet')
        cy.get('form').find('input[type="submit"]').should(`have.attr`, `value`, `Send Message`)
    })

    it(`Test /contact_success page`, () => {
        cy.visit(`/contact_success`)
        cy.wait(500)

        cy.contains('Thanks for reaching out!')
        cy.findAllByText(`Return home`).first().focus()
        cy.focused()
            .should(`have.text`, `Return home`)
            .should(`have.attr`, `href`, `/`)
    })
})
