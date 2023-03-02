const SalesforceIntegrationManager = require('../../../src/managers/integrations/SalesforceIntegrationManager');
const SalesforceEntityManager = require('../../../src/managers/entities/SalesforceManager');
const PrimaryEntityManager = require('../../../src/managers/entities/ConnectWiseManager');
const mongoose = require('mongoose');
const { Integration } = require('@friggframework/integrations');

function MockedIntegration() {
    return {
        create: () => {
            const integration = new Integration();
            integration.id = new mongoose.Types.ObjectId();
            integration.config = {};
            integration.user = { _id: new mongoose.Types.ObjectId() };
            return integration;
        },
    };
}

class MockedSalesforceIntegrationManager {
    static manager = null;

    static getInstanceFromIntegrationId({ integrationId }) {
        if (MockedSalesforceIntegrationManager.manager) {
            return MockedSalesforceIntegrationManager.manager;
        }

        const manager = new SalesforceIntegrationManager();

        manager.delegate = manager;
        manager.delegateTypes.push('EXAMPLE_EVENT');
        manager.integration = new MockedIntegration().create();

        manager.primaryInstance = new PrimaryEntityManager({
            userId: manager.integration.user._id,
        });
        manager.primaryInstance.entity = { _id: new mongoose.Types.ObjectId() };

        manager.primaryInstance.api = {
            // mocked API responses from Ironclad
        };
        // Spies on whatever methods we want to track
        // sinon.spy(manager.primaryInstance.api, 'createWebhook');

        manager.targetInstance = new SalesforceEntityManager({
            userId: manager.integration.user._id,
        });

        manager.targetInstance.api = {
            find: jest.fn().mockResolvedValue([{ data: 'foo' }]),
        };

        MockedSalesforceIntegrationManager.manager = manager;
        return manager;
    }
}

describe('Salesforce Integration Manager', () => {
    let integrationManager;
    beforeAll(async () => {
        integrationManager =
            await MockedSalesforceIntegrationManager.getInstanceFromIntegrationId(
                {}
            );

        expect(integrationManager.delegate).toBe(integrationManager);
        expect(integrationManager.delegateTypes).toHaveLength(1);
    });

    it('should get sample contact data', async () => {
        const response = await integrationManager.getSampleData();
        expect(response[0]).toHaveProperty('data');
    });
});
