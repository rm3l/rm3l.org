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
