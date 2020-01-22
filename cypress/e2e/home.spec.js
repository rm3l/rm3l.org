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

    it(`Navigating to an unknown page returns the 404 Page`, () => {
        cy.visit(`/a-fake-unknown-page_` + new Date().getMilliseconds())
        cy.wait(500)
        cy.contains(`h1`, `404`)
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

describe(`Portfolio page`, () => {
    beforeEach(() => {
        cy.visit(`/portfolio`)
        cy.wait(500)
    })

    it(`Works and ALL selected by default`, () => {
        cy.contains(`h1`, `Projects`)
        cy.get(`button[data-filter="ALL"]`)
            .should(`have.css`, `background-color`, `rgb(255, 99, 71)`)
    })

    it(`Clicking on filter buttons works and highlights the right button`, () => {
        const allFilters = [`android`, `docker`, `flutter`, `go`, `java`, `kotlin`, `other`]
        allFilters.forEach((filter) => {
            cy.get(`button[data-filter="${filter}"]`).click()
            cy.wait(500)
            cy.get(`button[data-filter="${filter}"]`)
                .should(`have.css`, `background-color`, `rgb(255, 99, 71)`)
                .should(`have.css`, `color`, `rgb(0, 0, 0)`)
            allFilters.filter(filterToHandle => filterToHandle !== filter)
                .forEach((filterToHandle) => {
                    cy.get(`button[data-filter="${filterToHandle}"]`)
                        .should(`have.css`, `background-color`, `rgb(221, 221, 221)`)
                        .should(`have.css`, `color`, `rgb(0, 0, 0)`)
                })
        })
    })
})
