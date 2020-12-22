/* eslint-disable no-undef */
describe(`Portfolio page`, () => {
    beforeEach(() => {
        cy.visit(`/portfolio`)
        cy.wait(2000)
    })

    it(`Works and ALL selected by default`, () => {
        cy.contains(`h1`, `Projects`)
        cy.get(`button[data-filter="ALL"]`)
            .should(`have.css`, `background-color`, `rgb(255, 99, 71)`)
    })

    it(`ensures all portfolio card images are resolvable`, () => {
        cy.get(`.card__image img`)
            .should(`be.visible`)
            .each(($el) => {
                cy.wrap($el)
                    .and(($img) => {
                    // "naturalWidth" and "naturalHeight" are set when the image loads
                        expect($img[0].naturalWidth).to.be.greaterThan(0)
                    })
                    .invoke(`attr`, `src`)
                    .then((imgSrc) => {
                        cy.log(`imgSrc=[${imgSrc}]`)
                        cy.request(imgSrc).then((resp) => {
                            expect(resp.status).to.eq(200)
                        })
                    })
            })
    })

    it(`Clicking on filter buttons works and highlights the right button`, () => {
        const allFilters = [`android`, `docker`, `flutter`, `go`, `java`, `kotlin`, `other`]
        allFilters.forEach((filter) => {
            cy.get(`button[data-filter="${filter}"]`).click()
            cy.wait(1500)
            cy.get(`button[data-filter="${filter}"]`)
                .should(`have.css`, `background-color`, `rgb(255, 99, 71)`)
                .should(`have.css`, `color`, `rgb(0, 0, 0)`)
            allFilters.filter(filterToHandle => filterToHandle !== filter)
                .forEach((filterToHandle) => {
                    cy.get(`button[data-filter="${filterToHandle}"]`)
                        .should(`not.have.css`, `background-color`, `rgb(255, 99, 71)`)
                        .should(`have.css`, `color`, `rgb(0, 0, 0)`)
                })
        })
    })
})
