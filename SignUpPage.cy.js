/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

const fname = faker.name.firstName();
const lname = faker.name.lastName();
const email = faker.internet.email();
const phone = faker.phone.number('89#-######');
            


describe("Sign Up form suite", () => {


    describe("Sign in User - HappyPath", () => {
        // Visit registration page befoe each test 
        beforeEach(() => {
            cy.visit("https://transfermate.io/en/register.asp");
            cy.wait(2000);
        });


        it("Assert sign Up form elements  ", () => {
            cy.get(".container").contains('h1', "Sign up now");
            cy.url().should('eq', 'https://transfermate.io/en/register.asp');
            // check acount-type  buttons 
            cy.get('[class="group-fields-account_type"').find('[type="radio"]').then(customerType => {
                cy.wrap(customerType).eq(0).check({ force: true })
                    .should('be.enabled')
                    .get('#register_account_type_education_label_cell')
                    .should('contain.text', 'Education');

                cy.wrap(customerType).eq(1).check({ force: true })
                    .should('be.enabled')
                    .get("[id='register_account_type_individual'][for='account_type_individual']").should('contain.text', 'Individual');

                cy.wrap(customerType).eq(2).check({ force: true }).should('be.enabled')
                    .get("[id='register_account_type_corporate'][for='account_type_corporate']").should('contain.text', 'Corporate');
                cy.wrap(customerType).eq(3).check({ force: true }).should('be.enabled')
                    .get("[id='register_account_type_partnership'][for='account_type_partnership']").should('contain.text', 'Partnership');

                cy.wrap(customerType).eq(4).check({ force: true }).should('be.enabled')
                    .get("[id='register_account_type_sole_trader'][for='account_type_sole_trader']").should('contain.text', 'Sole Trader');

            });

            // verify country selector
            cy.get('[name="country"]').select("United Kingdom").should('contain', 'United Kingdom');
            cy.get('[name="__pin_mobile_number_international_dialing_code"]').select("Barbados +1-246").should('contain', 'Barbados');
            //type Inputs 
            cy.get('[id="register_first_name"]').then(label => {
                expect(label.text()).to.eq('First Name');
            });
            cy.get('[id="register_last_name"]').then(label => {
                expect(label.text()).to.eq('Last Name');
            });

            cy.get('[id="register_email"]').then(label => {
                expect(label.text()).to.eq('Work email address');
            });

            cy.get('#__pin_mobile_number_mobile_phone').should('have.attr', 'placeholder').and('include', "Mobile Phone");
            cy.get('#register_terms_of_use_agree_form_input').click();
            cy.get('[name="terms_of_use_agree"]').uncheck({ force: true })
            cy.get('[id="register_newsletter_and_privacy_policy_agree_row"]').find(".check-radio-label").click();
            cy.get('[name="newsletter_and_privacy_policy_agree"]').uncheck({ force: true })
            cy.get('#button_subscribe').should('have.value', 'Open my free account').click();

        });
    
        it("Register random user", () => {

            cy.get('.calc_captcha_question').find('span').filter(':visible').invoke('text').then(text1 => {
                // save captcha response 
                let num2 = text1.slice(0, 6);
                let num = eval(num2);
                cy.get('[id="__calc_captcha_text"]').type(num);
                // console.log(num)
            });
            // cy.once('uncaught:exception', () => false);
            cy.get('#cookies-read-more-link').click();
            cy.contains("Corporate").click();
            cy.contains("First Name").type(fname);
            cy.contains("Last Name").type(lname);
            cy.get('[name="email"]').type(email);
            cy.get('[name="__pin_mobile_number_mobile_phone"]').type(phone);
            cy.get('#register_terms_of_use_agree_form_input > .check-radio-label').click();

            cy.wait(2000);
            cy.get('#button_subscribe').click();
            cy.contains("Check your mail")
 
        });

    });

});
