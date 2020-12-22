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

// eslint-disable-next-line no-unused-vars
module.exports = (on, _config) => {
    // `on` is used to hook into various events Cypress emits
    // `config` is the resolved Cypress config
    on(`before:browser:launch`, (browser = {}, launchOptions) => {
    //Auto-open Dev Tools for easier debugging
        if ((browser.family === `chromium` || browser.family === `chrome`) && browser.name !== `electron`) {
            launchOptions.args.push(`--auto-open-devtools-for-tabs`)
            launchOptions.args.push(`--incognito`)
        } else if (browser.family === `firefox`) {
            launchOptions.args.push(`-devtools`)
            launchOptions.args.push(`-private`)
        } else if (browser.name === `electron`) {
            launchOptions.preferences.devTools = true
        }

        return launchOptions
    })
}
