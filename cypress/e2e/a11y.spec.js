/// <reference types="Cypress" />

describe(`Accessibility checks`, () => {

    it(`Has no detectable a11y violations on load`, () => {
        cy.visit(`/`)
        cy.injectAxe()
        cy.wait(500)
        cy.checkA11y()
    })

    it(`Navigates to page 2 and checks for accessibility violations`, () => {
        cy.visit(`/page/2`)
        cy.injectAxe()
        cy.wait(500)
        cy.checkA11y()
    })

    it(`Navigates to Portfolio and checks for accessibility violations`, () => {
        cy.visit(`/portfolio`)
        cy.injectAxe()
        cy.wait(500)
        cy.checkA11y()
    })

    it(`Navigates to Contact Page and checks for accessibility violations`, () => {
        cy.visit(`/contact`)
        cy.injectAxe()
        cy.wait(500)
        cy.checkA11y()
    })

    it(`Navigates to Contact Success Page and checks for accessibility violations`, () => {
        cy.visit(`/contact_success`)
        cy.injectAxe()
        cy.wait(500)
        cy.checkA11y()
    })
})
