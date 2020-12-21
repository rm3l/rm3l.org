/* eslint-disable no-undef */
/// <reference types="cypress" />
describe(`from root URL`, () => {
    beforeEach(() => {
        cy.intercept(/.*\/publication_logo\.jpg$/).as('publication_logo')
        cy.intercept(/.*\/publication_cover\.jpg$/).as('publication_cover')
        cy.visit(`/`)
        cy.wait(500)
    })

    it(`Home page works`, () => {
        cy.contains(`Armel Soro's blog`)
        // https://on.cypress.io/screenshot
        cy.screenshot(`site`, { capture: `runner` })
    })

    it(`Checks publication logo image is resolvable`, () => {
        cy.wait('@publication_logo').its('response.statusCode').should('eq', 200)
        cy.get(`[alt="Armel Soro's blog"]`)
            .should('be.visible')
            .and(($img) => {
                // "naturalWidth" and "naturalHeight" are set when the image loads
                expect($img[0].naturalWidth).to.be.greaterThan(0)
            })
    })

    it(`Checks publication cover image is resolvable`, () => {
        cy.wait('@publication_cover').its('response.statusCode').should('eq', 200)
        cy.get('.site-head').should('be.visible')
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
