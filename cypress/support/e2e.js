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

import './commands'
import './selectors.js'

require('@cypress/xpath');

import '@mmisty/cypress-allure-adapter/support';
import "cypress-real-events/support";
import 'cypress-plugin-steps'
import 'cypress-iframe'

Cypress.on('uncaught:exception', (err, runnable) => {

    return false
  })

before(function () {
    // disable Cypress's default behavior of logging all XMLHttpRequests and fetches to the Command Log
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
})

import { registerCommand } from 'cypress-wait-for-stable-dom'
registerCommand()

import 'cypress-pipe'