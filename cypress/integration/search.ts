context("Search", () => {
  it("has search bar", () => {
    cy.visit("#/search")
      .get("#root > .container")
      .within(() => {
        cy.get("form")
          .should("have.length", 1)
          .within(() => {
            cy.get("input")
              .should("have.length", 1)
              .invoke("attr", "placeholder")
              .should("match", /Search/i);
          });
      });
  });

  it("points to search bar", () => {
    cy.visit("#/search")
      .get("#root > .container")
      .within(() => {
        cy.get(".alert")
          .contains(/Query above/i)
          .should("have.length", 1);
      });
  });

  it("finds card 'Hahnengrundweg'", () => {
    cy.visit("#/search")
      .get("#root > .container")
      .within(() => {
        cy.get("form")
          .within(() => {
            cy.get("input").type("Hahnengrundweg");
          })
          .submit();
        cy.get(".card").within(() => {
          cy.get(".card-title")
            .contains(/Hahnengrundweg/i)
            .should("have.lengthOf.at.least", 1)
            .siblings(".card-subtitle")
            .contains(/Card/i);
        });
      });
  });

  it("finds card 'Hahnengrundweg' with link to GND 7621021-2", () => {
    cy.visit("#/search")
      .get("#root > .container")
      .within(() => {
        cy.get("form")
          .within(() => {
            cy.get("input").type("Hahnengrundweg");
          })
          .submit();
        cy.get(".card").within(() => {
          cy.get(".card-title")
            .contains(/Hahnengrundweg/i)
            .should("have.lengthOf.at.least", 1)
            .siblings(".card-text")
            .contains(/7621021-2/i)
            .invoke("attr", "href")
            .should("contain", "http://d-nb.info/gnd/7621021-2");
        });
      });
  });

  it("doesn't find 'Yorkshire'", () => {
    cy.visit("#/search")
      .get("#root > .container")
      .within(() => {
        cy.get("form")
          .within(() => {
            cy.get("input").type("Yorkshire");
          })
          .submit();
        cy.get(".card").should("have.length", 0);
        cy.contains(/No results/i).should("have.length", 1);
      });
  });
});

// Empty export needed to compile file as module.
export {};