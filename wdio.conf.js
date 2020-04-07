const cloneCapabilities = require("./utils")

// process.env.NODE_DEBUG = "request";
const NUM_OF_INSTANCES = process.env.WDIO_CAP_MULTIPLIER || 5;
const baseCapability = {

    platform:"macOS 10.13",
    browserName: 'googlechrome',
    version: '75.0',
    build: process.env.SAUCE_BUILD_NAME || `timezone-reporter-build ${new Date().toISOString()}`
}

exports.config = {
    // debug: true,
    // execArgv: ['--inspect=127.0.0.1:5859'],

    runner: 'local',
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    
    
    specs: [
        './tests/*.ts'
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],

    maxInstances: 20,
    capabilities: cloneCapabilities(baseCapability, NUM_OF_INSTANCES),
    logLevel: 'warn',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 0,
    services: ['sauce'],
    framework: 'mocha',
    reporters: [
        'concise'
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

