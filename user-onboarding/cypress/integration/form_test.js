describe("Testing our form inputs", ()=>{
    beforeEach(function(){
        cy.visit("http://localhost:3000");
    });
    it("Input name into the Name Input", ()=> {
        cy.get('#name')
            .type("Charlene Johnson")
            .should("have.value", "Charlene Johnson")
        cy.get('#email')
            .type("charlene.j8234@gmail.com")
            .clear()
            cy.contains("Must include email address!")
            //If I comment out clear and cy.contains, the test will run everything, if it is not commented out, it will fail the test since submit is disabled if not all fields are entered!
        cy.get('#password')
            .type("abcdefg")
        cy.get('#role')
            .select("Full Stack Web Developer")
        cy.get('#terms')
            .check()
            .should("be.checked")
        cy.get('.sc-AxgMl')
            .click()
    });
});