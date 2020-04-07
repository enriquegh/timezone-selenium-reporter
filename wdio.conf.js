const cloneCapabilities = require("./utils")

// process.env.NODE_DEBUG = "request";
const NUM_OF_INSTANCES = process.env.WDIO_CAP_MULTIPLIER || 5;
const baseCapability = {

    platformName:"macOS 10.13",
    browserName: 'googlechrome',
    browserVersion: 'latest',
}

exports.config = {
    // debug: true,
    // execArgv: ['--inspect=127.0.0.1:5859'],

    runner: 'local',
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    sauceConnect: true,
    
    
    specs: [
        './tests/*.ts'
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],

    maxInstances: 20,
    capabilities: cloneCapabilities(baseCapability, NUM_OF_INSTANCES),
    logLevel: 'debug',
    // logLevels: {
        // webdriver: 'info',
        // 'wdio-applitools-service': 'info'
    // },
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 0,
    services: ['sauce'],
    framework: 'mocha',
    reporters: [
        'spec',
        ['junit', {
            outputDir: './junit_xml/',
            outputFileFormat: function(options) {
                return `wdio-results-${options.cid}.xml`
            }
        }]

    ],
    
    //
    // Options to be passed to Mocha.
    // See the full list at http://mochajs.org/
    mochaOpts: {
        ui: 'bdd',
        timeout: 400000,
        compilers: ['ts:ts-node/register'], 
    },

    before: function (capabilities, specs) {
        require('ts-node').register({ files: true })
    },
}

