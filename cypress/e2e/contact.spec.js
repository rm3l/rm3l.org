/* eslint-disable no-undef */
describe(`Contact form`, () => {
    beforeEach(() => {
        cy.visit(`/contact`)
        cy.wait(500)
    })

    it(`Title exists`, () => {
        cy.contains(`Contact me`)
    })

    it.skip(`Displays a contact form with a submit button`, () => {
	//Flaky test skipped for now, but should get fixed with https://github.com/rm3l/rm3l.org/issues/632
        cy.get(`form`).contains(`Name`)
        cy.get(`form`).find(`input[name="name"]`).should(`have.attr`, `placeholder`, `Jane Doe`)
        cy.get(`form`).contains(`Email`)
        cy.get(`form`).find(`input[name="_replyto"]`).should(`have.attr`, `placeholder`, `jane@doe.com`)
        cy.get(`form`).contains(`Message`)
        cy.get(`form`).find(`textarea[name="message"]`)
        cy.get(`form`).find(`input[type="submit"]`).should(`have.attr`, `value`, `Send Message`)
    })

    it(`Does not submit if email is missing`, () => {
        cy.get(`form`).find(`textarea[name="message"]`).type(`Lorem Ipsum Dolor Sit Amet`)
        cy.get(`form`).find(`input[type="submit"]`).click()
        cy.get(`.info-msg`).should(`not.exist`)
    })

    it(`Does not submit if message is missing`, () => {
        cy.get(`form`).find(`input[type="email"]`).type(`leia+tests@organa.com`)
        cy.get(`form`).find(`input[type="submit"]`).click()
        cy.get(`.info-msg`).should(`not.exist`)
    })

    it(`Does not submit if "I'm not a robot" reCaptcha checkbox not checked`, () => {

        cy.intercept('POST', /^https:\/\/formspree\.io\/*/, {
            statusCode: 400,
            body: `{"error":"reCAPTCHA failed"}`
        }).as(`contact_form`)

        cy.get(`form`).find(`input[name="name"]`).type(`E2E auto-tester`)
        cy.get(`form`).find(`input[type="email"]`).type(`e2e_auto_tester@example.com`)
        cy.get(`form`).find(`textarea[name="message"]`).type(`Lorem Ipsum Dolor Sit Amet`)

        cy.get(`form`).find(`input[type="submit"]`).click()

        cy.wait(`@contact_form`)

        //Error message
        cy.get(`.info-msg`).should(`have.css`, `color`, `rgb(255, 0, 0)`)

        //Form not reset
        cy.get(`form`).find(`input[name="name"]`).should(`have.value`, `E2E auto-tester`)
        cy.get(`form`).find(`input[type="email"]`).should(`have.value`, `e2e_auto_tester@example.com`)
        cy.get(`form`).find(`textarea[name="message"]`).should(`have.value`, `Lorem Ipsum Dolor Sit Amet`)
    })
})
