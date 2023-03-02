/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    globalSetup: './scripts/globalSetup.js',
    globalTeardown: './scripts/globalTeardown.js',
    setupFilesAfterEnv: ['./scripts/setupFile.ts'],

    testTimeout: 240_000, // 2 minutes
};
