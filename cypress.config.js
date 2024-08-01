const { defineConfig } = require('cypress')
//const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const { configureAllureAdapterPlugins } = require("@mmisty/cypress-allure-adapter/plugins");
const {verifyDownloadTasks}= require('cy-verify-downloads');
const { registerCommand } = require('cypress-wait-for-stable-dom')
// registerCommand()


module.exports = defineConfig({
  env: {
   // url: 'https://wurthlac.com/',
   // url: 'https://webqa.wurthlac.com/',
   // url: 'https://webstg.wurthlac.com',
    allureCleanResults: true,
    allureResults: 'allure-results',
    //set user details that suite will run
    username: 'thilina.manawadu@villvay.com',
    password:'Testtest1!',
    firstName: "Test",
    profile_permission: "ADMIN",
    profile_status: "ACTIVE",
    fixtureFolder:"prod"
  },
  // reporter:'cypress-mochawesome-reporter',
  // reporterOptions: {
  //   reportDir: 'cypress/reports',
  //   charts: true,
  //   reportPageTitle: 'custom-title',
  //   embeddedScreenshots: true,
  //   inlineAssets: false,
  //   saveAllAttempts: false,
  // },
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

    baseUrl:'https://wurthlac.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
  },
});
