const { defineConfig } = require('cypress')
//const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const { configureAllureAdapterPlugins } = require("@mmisty/cypress-allure-adapter/plugins");
const {verifyDownloadTasks}= require('cy-verify-downloads');
const { registerCommand } = require('cypress-wait-for-stable-dom')
// registerCommand()


module.exports = defineConfig({
  env: {
    // allureCleanResults: true,
    // allureResults: 'allure-results',
    username: 'thaksharan564@gmail.com',
    password:'Wurth@2024'
  },
  screenshotOnRunFailure: true,
  video: true,
  pageLoadTimeout: 120000,
  defaultCommandTimeout: 80000,
  projectId: 'f8son2',
  viewportHeight: 720,
  viewportWidth: 1280,
  chromeWebSecurity:false,
  requestTimeout:20000,
  

  e2e: {
    setupNodeEvents(on, config) {
      on('task', {verifyDownloadTasks})
      // implement node event listeners here
      this.screenshotOnRunFailure=true;
      //require('cypress-mochawesome-reporter/plugin')(on);
      //allureWriter(on, config);
      configureAllureAdapterPlugins(on, config);
      return config;

    },

    baseUrl:'https://www.singersl.com/',
    specPattern: 'cypress/e2e/**/*.cy.js',
  },
});
