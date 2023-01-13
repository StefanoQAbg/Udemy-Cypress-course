import { faker } from '@faker-js/faker';
import { MailSlurp } from 'mailslurp-client';
/// <reference types="cypress-mailslurp" />
const fname = faker.name.firstName();
const lname = faker.name.lastName();
const email = faker.internet.email();
const phone = faker.phone.number('89#-######');
const mailslurp = new MailSlurp({
    apiKey: process.env.API_KEY ?? 'apy-key',
});
// emailverification need Mailslurp acct  and apy-key
let inboxId = "7c572196-e844-446d-858f-65e0dd47f3e3";
let emailAddress = inboxId + '@mailslurp.com';


describe("Verify User withMailslurp ", () => {
    // Visit registration page befoe each test 

        it( "get link ", ()=> {
            mailslurp.waitForLatestEmail(inboxId).then(email => {
                let body = email.body;
                var regExpr = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi;
                const url = body.match(regExpr, link => {
                    return link[3]
                })
                const href = url[3].slice(0, 135)

                cy.wrap(href).then(href => {
                    cy.task('setHref', href)
                    console.log(href)
                });
            })
            
        })
  
    
        it("Set password and Activate account", () => {

            cy.task('getHref').then((href) => {
                cy.visit(href, ()=>{                
                  
                 })
                 
                 cy.get('[name="password"]').type("Igotit123456")
                 cy.get('[name="confirm_password"]').type("Igotit123456")
                 cy.get('[name="button_subscribe"]').click()
                //  cy.wait(3000)
                 cy.visit('www.receivesms.co/uk-phone-number/3413/',()=>{
                    
                 })
                 cy.get('span').find('b').to.eq(1).then(text =>{
                    cy.wrap(text).as('pin')
                    console.log(text)
                 })
                //  cy.get('[class="btn-primary btn"]')
               
                //  })
                 //cy.get('[class="user_pin form-control"]').type("pin")
                });


                });


    });

