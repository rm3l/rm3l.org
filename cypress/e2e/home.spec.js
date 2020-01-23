/// <reference types="cypress" />
describe(`from root URL`, () => {
    beforeEach(() => {
        // actual url is "baseUrl" in "cypress.json"
        cy.visit(`/`)
        cy.wait(500)
    })

    it(`Home page works`, () => {
        cy.contains(`Armel Soro's blog`)
        // https://on.cypress.io/screenshot
        cy.screenshot(`site`, { capture: `runner` })
    })

    it(`Navigates to page 2`, () => {
        cy.findByText(`Next`).click()
        cy.wait(500)
        cy.url().should(`include`, `/page/2`)
    })

    it(`Checks if Portfolio links are focusable and have the correct attributes`, () => {
        cy.findAllByText(`Portfolio`).first().focus()
        cy.focused()
            .should(`have.text`, `Portfolio`)
            .should(`have.attr`, `href`, `/portfolio`)
    })

    it(`Checks landing on Portfolio links`, () => {
        cy.findAllByText(`Portfolio`).first().click()
        cy.wait(500)
        cy.url().should(`include`, `/portfolio`)
        cy.contains(`h1`, `Projects`)
    })
})
