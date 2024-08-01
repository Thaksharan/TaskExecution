// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

///<reference types="Cypress"/>
///<reference types="cypress-iframe" />
/// <reference types="cypress-wait-for-stable-dom" />
// Import commands.js using ES2015 syntax:
import './commands'
import './navigation_commands'
import './components_commands/dialogShippingAddress_commands.js'
import './components_commands/dialogItemAddedToCart_commands.js'
import './components_commands/dialogQuickOrder_commands.js'
import './components_commands/dialogAccount&ShippingAddress_commands.js'
import './components_commands/dialogSignIn_commands.js'
import './components_commands/dialogCountrySelector_commands.js'
import './search_commands.js'
import './selectors.js'

// Alternatively you can use CommonJS syntax:
// require('./commands')

require('@cypress/xpath');

//import 'cypress-mochawesome-reporter/register';
//import '@shelex/cypress-allure-plugin';
import '@mmisty/cypress-allure-adapter/support';
import "cypress-real-events/support";
import 'cypress-plugin-steps'
import 'cypress-iframe'

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

// //display the generated videos and screenshots in the mocha result.
// import addContext from 'mochawesome/addContext';

// //add screenshots to mochaawesome report
// const titleToFileName = (title) => title.replace(/[:\/]/g, '');

// Cypress.on('test:after:run', (test, runnable) => {
//     if (test.state === 'failed') {
//         const filename = `${titleToFileName(runnable.parent.title)} -- ${titleToFileName(test.title)} (failed).png`;
//         addContext({ test }, `../screenshots/${Cypress.spec.name}/${filename}`);
//         //addContext({ test }, `../videos/${Cypress.spec.name}.mp4`);
//     }
// });

before(function () {
    // disable Cypress's default behavior of logging all XMLHttpRequests and fetches to the Command Log
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
})

import { registerCommand } from 'cypress-wait-for-stable-dom'
registerCommand()

import 'cypress-pipe'