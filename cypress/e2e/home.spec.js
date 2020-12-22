/* eslint-disable no-undef */
/// <reference types="cypress" />
describe(`from root URL`, () => {
    beforeEach(() => {
        cy.visit(`/`)
    })

    it(`Home page works`, () => {
        cy.contains(`Armel Soro's blog`)
        // https://on.cypress.io/screenshot
        cy.screenshot(`site`, { capture: `runner` })
    })

    it(`Checks publication logo image is resolvable`, () => {
        cy.get(`img[alt="Armel Soro's blog"]`)
            .should(`be.visible`)
            .and(($img) => {
                // "naturalWidth" and "naturalHeight" are set when the image loads
                expect($img[0].naturalWidth).to.be.greaterThan(0)
            })
    })

    it(`Checks publication cover image is resolvable`, () => {
        cy.get(`.site-head`)
            .should(`be.visible`)
            .invoke(`css`, `background-image`)
            .then((coverDivBgUrlCssProperty) => {
                cy.log(`coverDivBgUrlCssProperty=[${coverDivBgUrlCssProperty}]`)
                const coverDivBgUrl = /(?:\(['"]?)(.*?)(?:['"]?\))/.exec(coverDivBgUrlCssProperty)[1]
                cy.log(`coverDivBgUrl=${coverDivBgUrl}`)
                expect(coverDivBgUrl.length).to.be.greaterThan(0)
                cy.request(coverDivBgUrl).then((resp) => {
                    expect(resp.status).to.eq(200)
                })
            })
    })

    it(`Checks social links`, () => {
        cy.get(`.site-mast-right`).should(`be.visible`)
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
