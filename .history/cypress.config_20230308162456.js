const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.everlywell.com/",
    port: null,
    chromeWebSecurity: false,
    experimentalSessionAndOrigin: true,
  },
  defaultCommandTimeout: 10000,
});
