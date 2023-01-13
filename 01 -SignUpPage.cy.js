/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

const fname = faker.name.firstName();
const lname = faker.name.lastName();
const email = faker.internet.email();
const phone = faker.phone.number('89#-######');
// emailverification need Mailslurp acct            
let inboxId = '7c572132496-e844-446d-8asdf58f-65e0dd47f3e3';
let emailAddress = inboxId + '@mailslurp.com'

describe("Sign Up form suite", () => {


    describe("Sign in User - HappyPath", () => {
        
                 
        it("Register random user ", {retries:3}, () => {
            cy.visit("https://transfermate.io/en/register.asp");
            cy.get('#cookies-read-more-link').click();
            cy.wait(1000)

            cy.get('.calc_captcha_question').find('span').filter(':visible').invoke('text')
            .then(text1 => {
                // save captcha response 
                //console.log(text1)
                let num2 = text1.slice(0, 6);
                let num = eval(num2);
                cy.get('[id="__calc_captcha_text"]').type(num);
                //console.log(num)
            });
            // cy.once('uncaught:exception', () => false);
        
            cy.contains("Corporate").click();
            cy.contains("First Name").type(fname);
            cy.contains("Last Name").type(lname);
            cy.get('[name="email"]').type(emailAddress);
            cy.get('[name="__pin_mobile_number_international_dialing_code"]').select('United Kingdom +44')
            cy.get('[name="__pin_mobile_number_mobile_phone"]').type(7451277972);
            cy.get('#register_terms_of_use_agree_form_input > .check-radio-label').click();
             
            cy.wait(2000);
            cy.get('#button_subscribe').click();
            cy.get('[id="register_calc_captcha_error"]').should("not.be.visible")
            
            


        });

    });

    

});