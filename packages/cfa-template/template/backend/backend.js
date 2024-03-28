const { createFriggBackend } = require('@friggframework/core');
const HubSpotIntegration = require('./src/integrations/HubSpotIntegration');
const SalesforceIntegration = require('./src/integrations/LinearIntegration');

const appDefinition = {
    integrations:[
        HubSpotIntegration,
        SalesforceIntegration
    ],
    user: {
        password: true
    }
}
const backend = createFriggBackend(appDefinition);
module.exports = {...backend}
