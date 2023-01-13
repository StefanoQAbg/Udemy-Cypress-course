import { faker } from '@faker-js/faker';
import { MailSlurp } from 'mailslurp-client';
/// <reference types="cypress-mailslurp" />
const fname = faker.name.firstName();
const lname = faker.name.lastName();
const email = faker.internet.email();
const phone = faker.phone.number('89#-######');

let inboxId = "7c572196-e844-446d-858f-65e0dd47f3e3";
let emailAddress = inboxId + '@mailslurp.com';


    it("LogIn User",{retries:3}, () => {

        cy.visit("https://transfermate.io/en/login.asp");
        cy.wait(1000);
        cy.get('#cookies-read-more-link').click();

    cy.get('.calc_captcha_question').find('span').filter(':visible')
    .invoke('text').then(text1 => {
        // save captcha response 
        //console.log(text1)
        let num2 = text1.slice(0, 6);
        let num = eval(num2);
        cy.get('[id="__calc_captcha_text"]').type(num);
        //console.log(num)
    });
        cy.get('[name="username_loginto"]').type(emailAddress)
        cy.get('[name="password_loginto"]').type("Igotit123456")
        cy.get('[name="login_subscribe"]').click()
        cy.get('[id="register_calc_captcha_error"]').should("not.be.visible")





    // });
});

