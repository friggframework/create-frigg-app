// The purpose of this test is to make sure that you are connected to the DB you expect and that the ENV variables you expect to be set are working in order to debug why tests are failing

const { expect } = require('chai');

describe('env variable', () => {
    it('have MONGO_URI defined', () => {
        expect(process.env.MONGO_URI).toBeDefined();
    });
});
