const ExampleQueuer = require('../../../src/workers/examples/ExampleQueuer');
const QueuerUtil = require('../../../src/utils/QueuerUtil');
const { Integration } = require('@friggframework/integrations');
const messagesReceived = [];

jest.mock('aws-sdk', () => {
    const SQSMocked = {
        sendMessage: jest.fn().mockImplementation((params) => {
            messagesReceived.push(params.MessageBody);
            Promise.resolve();
        }),
        promise: jest.fn(),
    };

    const configMocked = {
        update: (params) => {
            return params;
        },
    };

    return {
        config: configMocked,
        SQS: jest.fn(() => SQSMocked),
    };
});

describe('ExampleQueuer unit tests', () => {
    let exampleQueuer = new ExampleQueuer();

    it('Items are successfully enqueued', async () => {
        const mockedIntegration = {
            id: 775656,
            config: { useMasterBoards: true },
        };
        let sentBodies = [];
        Integration.prototype;

        Integration.prototype.find = jest.fn().mockImplementation(() => {
            return [mockedIntegration];
        });

        QueuerUtil.enqueue = jest.fn().mockImplementation((params) => {
            sentBodies.push(params);
            return 'res';
        });

        await exampleQueuer._run();

        expect(sentBodies.length).toEqual(1);
        expect(sentBodies[0].worker).toEqual('CrossbeamPollWorker');
        expect(sentBodies[0].message.integrationId).toEqual(
            mockedIntegration.id
        );
    });
});
