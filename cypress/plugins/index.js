// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('before:browser:launch', (browser = {}, launchOptions) => {
    //Auto-open Dev Tools for easier debugging
    if ((browser.family === 'chromium' || browser.family === 'chrome') && browser.name !== 'electron') {
        launchOptions.args.push('--auto-open-devtools-for-tabs');
    } else if (browser.family === 'firefox') {
        launchOptions.args.push('-devtools');
    } else if (browser.name === 'electron') {
        launchOptions.preferences.devTools = true;
    }

    return launchOptions;
  });
}
